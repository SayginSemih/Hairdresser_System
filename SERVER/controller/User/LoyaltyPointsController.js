const db = require("../Database/db.js");

function Get(req, res) {
    const { user_id } = req.body;
    db.query("SELECT * FROM loyaltypoints AS t1 INNER JOIN hairdressers AS t2 ON t1.hairdresser_id = t2.hairdresser_id WHERE user_id = ?", [user_id], (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { Get }