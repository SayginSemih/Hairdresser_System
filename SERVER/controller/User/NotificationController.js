const db = require("../Database/db.js");

function Get(req, res) {
    const { user_id } = req.body;
    db.query("SELECT * FROM notification WHERE user_id = ? ORDER BY notification_id DESC", [user_id], (err, data) => {
        if (!err) {
            console.log(data)
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { Get }