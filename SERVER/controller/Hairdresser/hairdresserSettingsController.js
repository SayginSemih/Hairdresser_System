const db = require("../Database/db.js");
const bcrypt = require('bcrypt');
const multer = require('multer');

// Multer Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Resimlerin yükleneceği klasör
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Yükleme sırasında dosya adını belirleme
    }
});

const upload = multer({ storage: storage }).single(('image'));

function Update(req, res) {
    upload(req, res, (err) => {
        const { hairdresserName, hairdresserAddress, hairdresserMail, hairdresserPhone, hairdresserHiddenPrice, hairdresserID } = req.body;
        try { // FOTOĞRAF VARSA BU KISIM ÇALIŞIR
            const newData = {
                name: hairdresserName,
                address: hairdresserAddress,
                email: hairdresserMail,
                phone_number: hairdresserPhone,
                hidden_price: hairdresserHiddenPrice,
                filename: req.file.filename
            }
            db.query("UPDATE hairdressers SET ? WHERE hairdresser_id = ?", [newData, hairdresserID], (err, data) => {
                if (!err) {
                    res.send("1")
                }
                else {
                    console.log(err)
                    res.send("2")
                }
            })
        } // FOTOĞRAF YOKSA HATA VERECEĞİ İÇİN BU KISIM ÇALIŞIR
        catch {
            const newData = {
                name: hairdresserName,
                address: hairdresserAddress,
                email: hairdresserMail,
                phone_number: hairdresserPhone,
                hidden_price: hairdresserHiddenPrice
            }
            db.query("UPDATE hairdressers SET ? WHERE hairdresser_id = ?", [newData, hairdresserID], (err, data) => {
                if (!err) {
                    res.send("1")
                }
                else {
                    console.log(err)
                    res.send("2")
                }
            })
        }
    })
}

function ChangePassword(req, res) {
    const { hairdresserPassword, hairdresserID } = req.body
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    bcrypt.hash(hairdresserPassword, saltRounds, (err, hashedPassword) => {
        db.query("UPDATE hairdressers SET password_hash = ? WHERE hairdresser_id = ?", [hashedPassword, hairdresserID], (err, data) => {
            if (!err) {
                res.send("1");
            }
            else {
                console.log(err)
                res.send("2");
            }
        })
    });
}

module.exports = { Update, ChangePassword }