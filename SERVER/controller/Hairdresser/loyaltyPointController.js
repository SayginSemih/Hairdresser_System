const db = require("../Database/db.js");

function Earned(req, res) {
    const { user_id, hairdresser_id, points_earned, price, point } = req.body;
    db.query("SELECT * FROM loyaltypoints WHERE user_id = ? AND hairdresser_id = ?", [user_id, hairdresser_id], (err, data) => {
        if (data.length > 0) {
            if (!err) {
                const newPoint = Number(data[0].points_earned) + Number(points_earned);
                const newData = {
                    user_id,
                    hairdresser_id,
                    points_earned: newPoint.toFixed(2)
                }
                db.query("UPDATE loyaltypoints SET ? WHERE user_id = ? AND hairdresser_id = ?", [newData, user_id, hairdresser_id], (err2, data2) => {
                    if (!err2) {
                        db.query("SELECT * FROM hairdressers WHERE hairdresser_id = ?", [hairdresser_id], (err3, hairdresser) => {
                            if (!err3) {
                                const NotificationData = {
                                    user_id,
                                    message: `${hairdresser[0].name} adlı kuaförden ${price} TL değerinde hizmet aldınız ve kuaför tarafından ${points_earned} sadakat puanı kazandınız.`
                                }
                                db.query("INSERT INTO notification SET ?", [NotificationData], (err4, not) => {
                                    if (!err4) {
                                        res.send("1")
                                    } else {
                                        console.log(err4)
                                        res.send("2")
                                    }
                                })
                            } else {
                                console.log(err3)
                                res.send("2")
                            }
                        })
                    } else {
                        console.log(err2)
                        res.send("2")
                    }
                })
            } else {
                console.log(err)
                res.send("2")
            }
        } else {
            if (!err) {
                const newData = {
                    user_id,
                    hairdresser_id,
                    points_earned,
                    points_redeemed: 0
                }
                db.query("INSERT INTO loyaltypoints SET ?", [newData], (err2, data2) => {
                    if (!err2) {
                        db.query("SELECT * FROM hairdressers WHERE hairdresser_id = ?", [hairdresser_id], (err3, hairdresser) => {
                            if (!err3) {
                                const NotificationData = {
                                    user_id,
                                    message: `${hairdresser[0].name} adlı kuaförden ${price} TL değerinde hizmet aldınız ve kuaför tarafından ${points_earned} sadakat puanı kazandınız.`
                                }
                                db.query("INSERT INTO notification SET ?", [NotificationData], (err4, not) => {
                                    if (!err4) {
                                        res.send("1")
                                    } else {
                                        console.log(err4)
                                        res.send("2")
                                    }
                                })
                            } else {
                                console.log(err3)
                                res.send("2")
                            }
                        })
                    } else {
                        console.log(err2)
                        res.send("2")
                    }
                })
            } else {
                console.log(err)
                res.send("2")
            }
        }
    })
}

function Redeemed(req, res) {
    const { user_id, hairdresser_id, price } = req.body;
    db.query("SELECT * FROM loyaltypoints WHERE user_id = ? AND hairdresser_id = ?", [user_id, hairdresser_id], (err, data) => {
        if (data.length > 0) {
            if (!err) {
                if (Number(data[0].points_earned) >= Number(price)) {
                    const newPoint = Number(data[0].points_earned) - Number(price);
                    const newRedeemed =  Number(data[0].points_redeemed) + Number(price);
                    const newData = {
                        user_id,
                        hairdresser_id,
                        points_earned: newPoint.toFixed(2),
                        points_redeemed: newRedeemed.toFixed(2)
                    }
                    db.query("UPDATE loyaltypoints SET ? WHERE user_id = ? AND hairdresser_id = ?", [newData, user_id, hairdresser_id], (err2, data2) => {
                        if (!err2) {
                            db.query("SELECT * FROM hairdressers WHERE hairdresser_id = ?", [hairdresser_id], (err3, hairdresser) => {
                                if (!err3) {
                                    const NotificationData = {
                                        user_id,
                                        message: `${hairdresser[0].name} adlı kuaförden ${price} sadakat puanı kullanarak hizmet aldınız.`
                                    }
                                    db.query("INSERT INTO notification SET ?", [NotificationData], (err4, not) => {
                                        if (!err4) {
                                            res.send("1")
                                        } else {
                                            console.log(err4)
                                            res.send("2")
                                        }
                                    })
                                } else {
                                    console.log(err3)
                                    res.send("2")
                                }
                            })
                        } else {
                            console.log(err2)
                            res.send("2")
                        }
                    })
                }
                else {
                    res.send("3")
                }
            } else {
                console.log(err)
                res.send("2")
            }
        } else {
            res.send("3")
        }
    })
}

module.exports = { Earned, Redeemed };