const db = require("./../Database/db.js");

function Avaliable(req, res) {
    const { hairdresser_id } = req.body
    db.query("SELECT * FROM available_appointments AS t1 INNER JOIN staff AS t2 ON t1.staff_id = t2.staff_id WHERE t2.hairdresser_id = ? AND t1.state = 1 ORDER BY t1.appointment_id DESC", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

function Create(req, res) {
    const { user_id, hairdresser_id, staff_id, appointment_date, appointment_time, service_details } = req.body;
    db.query("SELECT * FROM available_appointments WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ? AND state = 1", [hairdresser_id, staff_id, appointment_date, appointment_time], (err, control) => {
        if (control.length > 0) {
            const newData = {
                user_id,
                hairdresser_id,
                staff_id,
                appointment_date,
                appointment_time,
                service_details
            }
            db.query("INSERT INTO appointments SET ?", newData, (err2, inserData) => {
                if (!err2) {
                    db.query("UPDATE available_appointments SET state = 0 WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ? AND state = 1", [hairdresser_id, staff_id, appointment_date, appointment_time], (err3, data) => {
                        if (!err3) {
                            res.send("1");
                        } else {
                            console.log(err3)
                            res.send("2");
                        }
                    })
                } else {
                    console.log(err2)
                    res.send("2")
                }
            })
        } else {
            res.send("3")
        }
    })
}

function Active(req, res) {
    const { user_id, hairdresser_id } = req.body
    db.query("SELECT * FROM appointments AS t1 INNER JOIN staff AS t2 ON t1.staff_id = t2.staff_id WHERE t1.user_id = ? AND t1.hairdresser_id = ?", [user_id, hairdresser_id], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.send("2");
            }
        } else {
            console.log(err)
            res.send("3")
        }
    })
}

function Cancel(req, res) {
    const { appointment_id, user_id, hairdresser_id, staff_id, appointment_date, appointment_time } = req.body;
    db.query("SELECT * FROM available_appointments WHERE DATE(?) = CURDATE() AND hairdresser_id = ?", [appointment_date, hairdresser_id], (cancel_error, cancel) => {
        if (!cancel_error) {
            if (cancel.length > 0) {
                res.send("3");
            } else {
                db.query("DELETE FROM appointments WHERE appointment_id = ? AND user_id = ?", [appointment_id, user_id], (err, removeAppointment) => {
                    if (!err) {
                        db.query("UPDATE available_appointments SET state = 1 WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ?", [hairdresser_id, staff_id, appointment_date, appointment_time], (err2, changeState) => {
                            if (!err2) {
                                res.send("1");
                            } else {
                                console.log(err2);
                                res.send("2");
                            }
                        })
                    } else {
                        console.log(err);
                        res.send("2");
                    }
                })
            }
        } else {
            console.log(cancel_error)
            res.send("2")
        }
    })
}

module.exports = { Avaliable, Create, Active, Cancel }