const db = require("../Database/db.js");

function Send(req, res) {
    const { hairdresser_id, title, message } = req.body;
    db.query("SELECT * FROM loyaltypoints WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        data.forEach(user => {
            const newData = {
                user_id: user.user_id,
                title,
                message
            }
            db.query("INSERT INTO notification SET ?", [newData], (err2, complate) => {
                if (!err2) {
                } else {
                    console.log(err2)
                    return res.send("2")
                }
            })
        })
    })
    res.send("1");
}

module.exports = { Send }