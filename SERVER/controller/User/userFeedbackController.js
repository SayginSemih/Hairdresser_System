const db = require("../Database/db.js")

function getHairdresser(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT hairdresser_id, name, phone_number, address, filename, sub_day FROM hairdressers WHERE hairdresser_id = ? AND sub_day > 0", [hairdresser_id], (err, data) => {
        if (!err) {
            if (data.length > 0)
                res.send(data[0])
            else
                res.send("3")
        } else {
            res.send("2")
        }
    })
}

function getUserFeedback(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT CONCAT(t1.name, ' ', t1.surname) AS full_name, t2.rating, t2.comments FROM users AS t1 INNER JOIN feedback AS t2 ON t1.user_id = t2.user_id WHERE t2.hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            db.query("SELECT CAST(AVG(rating) AS DECIMAL(10, 2)) AS avg_rating FROM feedback WHERE hairdresser_id = ?", [hairdresser_id], (err2, data2) => {
                if (!err2) {
                    res.send({ userfeedback: data, rating: data2[0] })
                }
                else {
                    res.send("2")
                }
            })
        } else {
            res.send("2")
        }
    })
}

function sendFeedback(req, res) {
    const { user_id, hairdresser_id, rating, comments } = req.body;
    db.query("SELECT * FROM feedback WHERE user_id = ? AND hairdresser_id = ?", [user_id, hairdresser_id], (err, data) => {
        if (data.length > 0) {
            res.send("3");
        } else {
            const newData = {
                user_id,
                hairdresser_id,
                rating,
                comments
            }
            db.query("INSERT INTO feedback SET ?", newData, (err2, data2) => {
                if (!err2) {
                    db.query("SELECT CAST(AVG(rating) AS DECIMAL(10, 2)) AS avg_rating FROM feedback WHERE hairdresser_id = ?", [hairdresser_id], (err3, data3) => {
                        if (!err3) {
                            db.query("UPDATE hairdressers SET rating = ? WHERE hairdresser_id = ?", [data3[0].avg_rating, hairdresser_id], (err4, data4) => {
                                if (!err4) {
                                    res.send("1");
                                }
                                else {
                                    res.send("2");
                                }
                            })
                        } else {
                            console.log(err3)
                            res.send("2");
                        }
                    })
                } else {
                    res.send("2");
                }
            })
        }
    })
}

module.exports = { getHairdresser, getUserFeedback, sendFeedback };