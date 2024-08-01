const db = require("./../Database/db.js");
var microtime = require('microtime');
var crypto = require('crypto');
var nodeBase64 = require('nodejs-base64-converter');
var request = require('request');


function getToken(req, res) {
    try {
        var hairdresser_id = req.body.hairdresser_id
        var sub_day = req.body.sub_day
        var merchant_id = '455544';
        var merchant_key = '1QgcX9S576RAwG1K';
        var merchant_salt = 'jLrKsxqcy1h7AjLB';
        var merchant_oid = "IN" + microtime.now(); // Sipariş numarası: Her işlemde benzersiz olmalıdır!! Bu bilgi bildirim sayfanıza yapılacak bildirimde geri gönderilir.
        var basket = JSON.stringify([
            [req.body.basket_name, '300.00', 1]
        ]);
        var user_basket = nodeBase64.encode(basket);
        // Sayfada görüntülenecek taksit adedini sınırlamak istiyorsanız uygun şekilde değiştirin.
        // Sıfır (0) gönderilmesi durumunda yürürlükteki en fazla izin verilen taksit geçerli olur.
        var max_installment = '0';
        var no_installment = '0'  // Taksit yapılmasını istemiyorsanız, sadece tek çekim sunacaksanız 1 yapın.
        var user_ip = '127.0.0.1';
        var email = req.body.email; // Müşterinizin sitenizde kayıtlı veya form vasıtasıyla aldığınız eposta adresi.
        var payment_amount = req.body.amount * 100; // Tahsil edilecek tutar. 9.99 için 9.99 * 100 = 999 gönderilmelidir.
        var currency = 'TL';
        var test_mode = '0'; // Mağaza canlı modda iken test işlem yapmak için 1 olarak gönderilebilir.
        var user_name = req.body.hairdresser_name; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız ad ve soyad bilgisi
        var user_address = req.body.hairdresser_address; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız adres bilgisi
        var user_phone = req.body.phone_number; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız telefon bilgisi

        // Başarılı ödeme sonrası müşterinizin yönlendirileceği sayfa
        // Bu sayfa siparişi onaylayacağınız sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
        var merchant_ok_url = process.env.REACT_HOSTING + '/odeme_basarili';
        // Ödeme sürecinde beklenmedik bir hata oluşması durumunda müşterinizin yönlendirileceği sayfa
        // Bu sayfa siparişi iptal edeceğiniz sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
        var merchant_fail_url = process.env.REACT_HOSTING + '/odeme_hata';
        var timeout_limit = 30; // İşlem zaman aşımı süresi - dakika cinsinden
        var debug_on = 1; // Hata mesajlarının ekrana basılması için entegrasyon ve test sürecinde 1 olarak bırakın. Daha sonra 0 yapabilirsiniz.
        var lang = 'tr'; // Türkçe için tr veya İngilizce için en gönderilebilir. Boş gönderilirse tr geçerli olur.

        // PAYTR ÖDEME İŞLEMLERİ

        var hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;

        var paytr_token = hashSTR + merchant_salt;

        var token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

        var options = {
            method: 'POST',
            url: 'https://www.paytr.com/odeme/api/get-token',
            headers:
                { 'content-type': 'application/x-www-form-urlencoded' },
            formData: {
                merchant_id: merchant_id,
                merchant_key: merchant_key,
                merchant_salt: merchant_salt,
                email: email,
                payment_amount: payment_amount,
                merchant_oid: merchant_oid,
                user_name: user_name,
                user_address: user_address,
                user_phone: user_phone,
                merchant_ok_url: merchant_ok_url,
                merchant_fail_url: merchant_fail_url,
                user_basket: user_basket,
                user_ip: user_ip,
                timeout_limit: timeout_limit,
                debug_on: debug_on,
                test_mode: test_mode,
                lang: lang,
                no_installment: no_installment,
                max_installment: max_installment,
                currency: currency,
                paytr_token: token,
                hairdresser_id,
                sub_day
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var res_data = JSON.parse(body);
            if (res_data.status == 'success') {
                const new_data = {
                    merchant_oid,
                    type: req.body.basket_name,
                    hairdresser_id
                }
                db.query("INSERT INTO subscribe_payments SET ?", [new_data], (err, data) => {
                    if (!err) {
                        res.send({ iframetoken: res_data.token });
                    }
                })
            } else {
                res.end(body);
            }

        });
    } catch (err) {
        res.send("3")
    }
}

function Callback(req, res) {
    const callback = req.body;
    // Sipariş durumunu kontrol et
    console.log(callback)
    if (callback.status === 'success') {
        console.log('SUCCESS GİRİLDİ');
        try {
            db.query("SELECT * FROM subscribe_payments WHERE merchant_oid = ?", [callback.merchant_oid], (err, data) => {
                if (!err) {
                    if (data[0].type == "Aylık Abonelik") {
                        console.log("1e girdi")
                        db.query("SELECT * FROM hairdressers WHERE hairdresser_id = ?", data[0].hairdresser_id, (err2, data2) => {
                            if (err2) {
                                return res.send("OK")
                            }
                            const sd = data2[0].sub_day;
                            const ac = 30;
                            const newCount = Number(sd) + Number(ac);
                            db.query("UPDATE hairdressers SET sub_day = ? WHERE hairdresser_id = ?", [newCount, data[0].hairdresser_id], (err3, data3) => {
                                if (!err3) {
                                    db.query("UPDATE subscribe_payments SET state = 1 WHERE merchant_oid = ?", [callback.merchant_oid], (err4, success) => {
                                        if (!err4) {
                                            console.log("ÖDEME BAŞARILI! Merchant id : " + callback.merchant_oid + " - Hairdresser id : " + data[0].hairdresser_id)
                                            res.send("OK")
                                        } else {
                                            res.send("OK")
                                        }
                                    })
                                }
                            })
                        })
                    } else {
                        console.log("2ye girdi")
                        db.query("SELECT * FROM hairdressers WHERE hairdresser_id = ?", data[0].hairdresser_id, (err2, data2) => {
                            if (err2) {
                                return res.send("OK")
                            }
                            const sd = data2[0].sub_day;
                            const ac = 365;
                            const newCount = Number(sd) + Number(ac);
                            db.query("UPDATE hairdressers SET sub_day = ? WHERE hairdresser_id = ?", [newCount, data[0].hairdresser_id], (err3, data3) => {
                                if (!err3) {
                                    db.query("UPDATE subscribe_payments SET state = 1 WHERE merchant_oid = ?", [callback.merchant_oid], (err4, success) => {
                                        if (!err4) {
                                            console.log("ÖDEME BAŞARILI! Merchant id : " + callback.merchant_oid + " - Hairdresser id : " + data[0].hairdresser_id)
                                            res.send("OK")
                                        }
                                        else {
                                            res.send("OK")
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
            })
        }
        catch (err) {
            console.log(callback)
            console.log(err)
            res.send("OK")
        }
    } else {
        console.log('BAŞARISIZ');
        res.send("OK") // Başarısız ise 2 döner
    }

}

module.exports = { getToken, Callback }