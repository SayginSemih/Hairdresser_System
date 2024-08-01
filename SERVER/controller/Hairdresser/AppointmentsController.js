const db = require("./../Database/db.js");
const util = require('util');

function formatDate(date1) {
    const d = new Date(date1)
    return d.getFullYear() + '-' +
        (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' +
        (d.getDate() < 10 ? '0' : '') + d.getDate();
}

function Create(req, res) {
    const { hairdresser_id, staff_id, appointment_date, appointment_time } = req.body;
    const newData = {
        hairdresser_id,
        staff_id,
        appointment_date,
        appointment_time
    }
    db.query("SELECT * FROM available_appointments WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ?", [hairdresser_id, staff_id, appointment_date, appointment_time], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.send("3")
            } else {
                db.query("INSERT INTO available_appointments SET ?", newData, (err2, data2) => {
                    if (!err2) {
                        res.send("1")
                    } else {
                        console.log(err2)
                        res.send("2")
                    }
                })
            }
        } else {
            console.log(err)
        }
    })
}

async function CreateWeekly(req, res) {
    const { hairdresser_id, staff_id, holiday, start_time, end_time } = req.body;
    const date = new Date();
    
    try {
        for (let i = 1; i < 7; i++) {
            const currentDate = new Date(date);
            currentDate.setUTCDate(date.getUTCDate() + i);
            const options = { weekday: 'long' };
            const dayName = currentDate.toLocaleDateString('en-EN', options);
            
            if (dayName !== holiday) {
                const [shours, sminutes] = start_time.split(':').map(Number);
                const [ehours, eminutes] = end_time.split(':').map(Number);
                
                const now = new Date();
                const sDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), shours, sminutes);
                const eDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ehours, eminutes);
                
                for (let j = sDate.getHours(); j < eDate.getHours(); j++) {
                    const time = j < 10 ? `0${j}:00` : `${j}:00`;
                    const newData = {
                        hairdresser_id,
                        staff_id,
                        appointment_date: formatDate(currentDate),
                        appointment_time: time
                    };

                    const existingAppointments = await util.promisify(db.query).bind(db)(
                        "SELECT * FROM available_appointments WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ?",
                        [hairdresser_id, staff_id, newData.appointment_date, newData.appointment_time]
                    );

                    if (existingAppointments.length > 0) {
                        console.log("Benzer randevular tespit edildi!");
                        return;
                    } else {
                        await util.promisify(db.query).bind(db)("INSERT INTO available_appointments SET ?", newData);
                    }
                }
            }
        }
        res.send("1");
    } catch (error) {
        console.error(error);
        res.send("2");
    }
}

async function CreateMonthly(req, res) {
    const { hairdresser_id, staff_id, holiday, start_time, end_time } = req.body;
    const date = new Date();

    try {
        for (let i = 1; i < 30; i++) {
            const currentDate = new Date(date);
            currentDate.setUTCDate(date.getUTCDate() + i);
            const options = { weekday: 'long' };
            const dayName = currentDate.toLocaleDateString('en-EN', options);
            
            if (dayName !== holiday) {
                const [shours, sminutes] = start_time.split(':').map(Number);
                const [ehours, eminutes] = end_time.split(':').map(Number);

                const now = new Date();
                const sDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), shours, sminutes);
                const eDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ehours, eminutes);

                for (let j = sDate.getHours(); j < eDate.getHours(); j++) {
                    const time = j < 10 ? `0${j}:00` : `${j}:00`;
                    const newData = {
                        hairdresser_id,
                        staff_id,
                        appointment_date: formatDate(currentDate),
                        appointment_time: time
                    };

                    const existingAppointments = await util.promisify(db.query).bind(db)(
                        "SELECT * FROM available_appointments WHERE hairdresser_id = ? AND staff_id = ? AND appointment_date = ? AND appointment_time = ?",
                        [hairdresser_id, staff_id, newData.appointment_date, newData.appointment_time]
                    );

                    if (existingAppointments.length > 0) {
                        console.log("Benzer randevular tespit edildi!");
                        return;
                    } else {
                        await util.promisify(db.query).bind(db)("INSERT INTO available_appointments SET ?", newData);
                    }
                }
            }
        }
        res.send("1");
    } catch (error) {
        console.error(error);
        res.send("2");
    }
}

function Check(req, res) {
    const hairdresser_id = req.body.hairdresser_id;
    db.query("SELECT * FROM available_appointments AS t1 INNER JOIN staff AS t2 ON t1.staff_id = t2.staff_id WHERE t1.hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.send(data)
            }
        }
        else {
            console.log(err)
            res.send("2")
        }
    })
}

function Remove(req, res) {
    const { appointment_id, hairdresser_id } = req.body;
    db.query("DELETE FROM available_appointments WHERE appointment_id = ? AND hairdresser_id = ?", [appointment_id, hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            res.send("2");
        }
    })
}

function List(req, res) {
    const { hairdresser_id } = req.body
    db.query("SELECT t2.name AS uname, t2.surname AS usurname, t3.name AS sname, t3.surname AS ssurname, t1.user_id, t1.staff_id, t1.appointment_time, t1.appointment_date, t1.service_details, t2.phone_number, t2.email, t1.appointment_id FROM appointments t1 INNER JOIN users t2 ON t1.user_id = t2.user_id INNER JOIN staff AS t3 ON t1.staff_id = t3.staff_id WHERE t3.hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send("2");
        }
    })
}

function Close(req, res) {
    const { user_id, staff_id, appointment_time, appointment_date, hairdresser_id, appointment_id } = req.body;
    db.query("DELETE FROM appointments WHERE appointment_id = ?", [appointment_id], (err, remove) => {
        if (!err) {
            db.query("DELETE FROM available_appointments WHERE hairdresser_id = ? AND staff_id = ? AND appointment_time = ? AND appointment_date = ?", [hairdresser_id, staff_id, appointment_time, appointment_date], (err2, data) => {
                if (!err2) {
                    res.send("1")
                } else {
                    console.log(err2)
                    res.send("2")
                }
            })
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { Create, CreateWeekly, CreateMonthly, Check, Remove, List, Close }