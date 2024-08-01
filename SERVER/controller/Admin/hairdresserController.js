const db = require("../Database/db.js");

function Get(req, res) {
    db.query("SELECT * FROM hairdressers", (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function Update(req, res) {
    const { hairdresser_id, name, phone_number, email, sub_day } = req.body;
    const newData = {
        name,
        phone_number,
        email,
        sub_day
    }
    db.query("UPDATE hairdressers SET ? WHERE hairdresser_id = ?", [newData, hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            console.log(err)
            res.send("2");
        }
    })
}

function Remove(req, res) {
    const { hairdresser_id } = req.body;
    db.query("DELETE FROM staff WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            console.log(err)
            res.send("2");
        }
    })
}

module.exports = { Get, Update, Remove }