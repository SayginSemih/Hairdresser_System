const db = require("../Database/db.js");
const dotenv = require('dotenv');
dotenv.config();

function userVerification(req, res) {
    const uniquecode = req.body.uniquecode;
    const approvedcode = req.body.approvedcode;

    // REACT TARAFINDAN GELEN UNIQUE CODE VE APPROVED CODE Yİ KULLANICI İLE EŞLEŞTİRİR
    db.query("SELECT * FROM users WHERE unique_code = ? AND approved_code = ?", [uniquecode, approvedcode], (err, data) => {
        if (data.length > 0) {
            // EŞLEŞME VARSA HESABI DOĞRULAR
            db.query("UPDATE users SET approved = 1 WHERE unique_code = ?", [uniquecode], (err2, data2) => {
                res.send("1")
            })
        }
        else {
            res.send("2");
        }
    })
}

module.exports = userVerification;