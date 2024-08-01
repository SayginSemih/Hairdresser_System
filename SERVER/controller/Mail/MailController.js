const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

function userForgotPasswdMail(c1, c2, userMail) {
    // E-posta göndermek için kullanılacak transporter oluşturuluyor
    let transporter = nodemailer.createTransport({
        service: process.env.MAILSERVICE,
        auth: {
            user: process.env.EMAIL, // Gönderici e-posta adresi
            pass: process.env.MAILPASS // E-posta hesabının şifresi
        }
    });

    const code = `${c1}/${c2}`

    // E-posta bilgileri
    let mailOptions = {
        from: 'semihsaygin3021@gmail.com', // Gönderici
        to: userMail, // Alıcı
        subject: 'Şifre Sıfırlama', // Konu
        html: `
            <p>Şifrenizi sıfırlamak için tıklayınız:</p>
            <a href="${process.env.REACT_HOSTING}/user/forgotpassword/${code}">Hesabı Sıfırla</a>
         ` // HTML içeriği
    };

    // E-posta gönderme işlemi
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('E-posta gönderildi: ' + info.response);
        }
    });
}

function hairdresserForgotPasswdMail(c1, c2, hairdresserMail) {
    // E-posta göndermek için kullanılacak transporter oluşturuluyor
    let transporter = nodemailer.createTransport({
        service: process.env.MAILSERVICE,
        auth: {
            user: process.env.EMAIL, // Gönderici e-posta adresi
            pass: process.env.MAILPASS // E-posta hesabının şifresi
        }
    });

    const code = `${c1}/${c2}`

    // E-posta bilgileri
    let mailOptions = {
        from: 'semihsaygin3021@gmail.com', // Gönderici
        to: hairdresserMail, // Alıcı
        subject: 'Şifre Sıfırlama', // Konu
        html: `
            <p>Şifrenizi sıfırlamak için tıklayınız:</p>
            <a href="${process.env.REACT_HOSTING}/hairdresser/forgotpassword/${code}">Hesabı Sıfırla</a>
        ` // HTML içeriği
    };

    // E-posta gönderme işlemi
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('E-posta gönderildi: ' + info.response);
        }
    });
}

function userRegisterMail(c1, c2, email) {
    // E-posta göndermek için kullanılacak transporter oluşturuluyor
    let transporter = nodemailer.createTransport({
        service: process.env.MAILSERVICE,
        auth: {
            user: process.env.EMAIL, // Gönderici e-posta adresi
            pass: process.env.MAILPASS // E-posta hesabının şifresi
        }
    });

    const code = `${c1}/${c2}`

    // E-posta bilgileri
    let mailOptions = {
        from: 'semihsaygin3021@gmail.com', // Gönderici
        to: email, // Alıcı
        subject: 'Hesabınızı doğrulayın', // Konu
        html: `
            <p>Lütfen hesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
            <a href="${process.env.REACT_HOSTING}/verification/${code}">Hesabı Doğrula</a>
        ` // HTML içeriği
    };

    // E-posta gönderme işlemi
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('E-posta gönderildi: ' + info.response);
        }
    });
}

module.exports = { userForgotPasswdMail, hairdresserForgotPasswdMail, userRegisterMail }