const db = require("../Database/db.js");
const bcrypt = require('bcrypt');

function userChangePassword(req, res) {
    const { userPassword, userID } = req.body
    const saltRounds = 10; // Hash için kullanılacak tuzun tur sayısı
    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        db.query("UPDATE users SET password_hash = ? WHERE user_id = ?", [hashedPassword, userID], (err, data) => {
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

module.exports = userChangePassword;