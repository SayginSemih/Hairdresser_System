const db = require("../Database/db.js");

function approved(req, res) {
    const hairdresserID = req.body.id
    db.query("UPDATE hairdressers SET approved = 1, sub_day = 30 WHERE hairdresser_id = ?", [hairdresserID], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            res.send("2");
        }
    })
}

function approvedList(req, res) {
    db.query("SELECT * FROM hairdressers WHERE approved = 0", (err, data) => {
        res.send(data)
    })
}

module.exports = { approved, approvedList }