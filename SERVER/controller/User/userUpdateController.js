const db = require("../Database/db.js");

function userUpdate(req, res) {
    const { userName, userSurname, userMail, userPhone, userID } = req.body;
    const newData = {
        name: userName,
        surname: userSurname,
        email: userMail,
        phone_number: userPhone
    }
    db.query("UPDATE users SET ? WHERE user_id = ?", [newData, userID], (err, data) => {
        if (!err) {
            res.send("1")
        }
        else{
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = userUpdate;