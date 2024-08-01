const db = require("../Database/db.js");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const qr = require('qrcode');
const fs = require('fs');
dotenv.config();
const mailService = require("./../../controller/Mail/MailController.js");

async function generateQRCode(text, filePath) {
    try {
        // QR kodu oluşturma işlemi
        const qrCode = await qr.toFile(filePath, text);
        console.log('QR kodu oluşturuldu:', qrCode);
        return qrCode;
    } catch (err) {
        console.error('QR kodu oluşturma hatası:', err);
        throw err;
    }
}

function userRegister(req, res) {
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    const userPassword = req.body.userPassword;

    // ŞİFREYİ HASH ETME YERİ
    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        const newUser = {
            phone_number: req.body.userPhone,
            email: req.body.userMail,
            password_hash: hashedPassword,
            name: req.body.userName,
            surname: req.body.userSurname,
            unique_code: req.body.Unique,
            approved_code: req.body.Approved
        };

        if (err) {
            console.error('Hashleme sırasında hata oluştu:', err);
        } else {
            // BU KULLANICI ADI VEYA E-MAİL DAHA ÖNCEDEN KULLANILMIŞ MI KONTROLÜ
            db.query("SELECT * FROM users WHERE email = ? OR phone_number = ?", [newUser.mail, newUser.phone_number], (err1, res1) => {
                if (res1.length > 0) {
                    console.log("Bu E-Mail veya Telefon zaten kullanılmaktadır!")
                    res.send("3")
                }
                else {
                    // INSERT INTO TELEFON EKLEME
                    db.query('INSERT INTO users SET ?', newUser, (err2, result) => {
                        if (!err2) {
                            // Mail Gönderme
                            mailService.userRegisterMail(newUser.unique_code, newUser.approved_code, newUser.email);
                            console.log("Veritabanına kayıt işlemi başarılı!");
                            // Qr Kod Oluşturma Yeri
                            const qrText = process.env.REACT_HOSTING + '/hairdresser/user-service/' + newUser.unique_code;
                            const qrFilePath = 'uploads/' + newUser.unique_code +'.png';

                            generateQRCode(qrText, qrFilePath)
                                .then(() => console.log('QR kodu dosyaya kaydedildi.'))
                                .catch((err) => console.error('QR kodu oluşturma ve kaydetme hatası:', err));
                            res.send("1")
                        }
                        else {
                            console.log(err2)
                            console.log("Veritabanına kayıt işlemi başarısız!");
                            res.send("2")
                        }
                    });
                }
            })
            // Hashlenmiş parolayı veritabanına kaydetme veya başka bir işlem yapma
        }
    });
}

function hairdresserRegister(req, res) {
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    const hairdresserPassword = req.body.hairdresserPasswd;

    // ŞİFREYİ HASH ETME YERİ
    bcrypt.hash(hairdresserPassword, saltRounds, (err, hashedPassword) => {
        const newHairdresser = {
            phone_number: req.body.hairdresserPhone,
            email: req.body.hairdresserMail,
            password_hash: hashedPassword,
            name: req.body.hairdresserName,
            address: req.body.hairdresserAddress
        };

        if (err) {
            console.error('Hashleme sırasında hata oluştu:', err);
        } else {
            // BU KUAFÖR TELEFONU VEYA E-MAİL DAHA ÖNCEDEN KULLANILMIŞ MI KONTROLÜ
            db.query("SELECT * FROM hairdressers WHERE email = ? OR phone_number = ? ", [newHairdresser.email, newHairdresser.phone_number], (err1, res1) => {
                if (res1.length > 0) {
                    console.log("Bu E-Mail veya Telefon zaten kullanılmaktadır!")
                    res.send("3")
                }
                else {
                    // INSERT INTO TELEFON EKLEME
                    db.query('INSERT INTO hairdressers SET ?', newHairdresser, (err2, result) => {
                        if (!err2) {
                            console.log("Veritabanına kayıt işlemi başarılı!");
                            res.send("1")
                        }
                        else {
                            console.log(err2)
                            console.log("Veritabanına kayıt işlemi başarısız!");
                            res.send("2")
                        }
                    });
                }
            })
            // Hashlenmiş parolayı veritabanına kaydetme veya başka bir işlem yapma
        }
    });
}

module.exports = { userRegister, hairdresserRegister }