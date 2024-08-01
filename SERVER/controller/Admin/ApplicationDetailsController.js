const db = require("../Database/db.js");

function approvedCount(req, res) {
    db.query("SELECT Count(*) AS count FROM hairdressers WHERE approved = 0", (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function userCount(req, res) {
    db.query("SELECT Count(*) AS count FROM users", (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function hairdresserCount(req, res) {
    db.query("SELECT Count(*) AS count FROM hairdressers", (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function subscribersCount(req, res) {
    db.query("SELECT Count(*) AS count FROM hairdressers WHERE sub_day > 0", (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { approvedCount, userCount, hairdresserCount, subscribersCount }