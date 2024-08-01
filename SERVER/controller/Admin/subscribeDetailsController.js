const db = require("../Database/db.js");

function Get(req, res) {
    db.query("SELECT * FROM subscribe_payments AS t1 INNER JOIN hairdressers AS t2 ON t1.hairdresser_id = t2.hairdresser_id WHERE t1.state = 1", (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { Get }