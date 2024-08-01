const db = require("../Database/db.js");

function List(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT * FROM services WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function hiddenPrice(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT hidden_price FROM hairdressers WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { List, hiddenPrice }