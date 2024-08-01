const db = require("./../Database/db.js");

function Add(req, res) {
    const { staffName, staffSurname, staffPosition, hairdresser_id } = req.body;
    const newData = {
        name: staffName,
        surname: staffSurname,
        position: staffPosition,
        hairdresser_id
    }
    db.query("INSERT INTO staff SET ?", newData, (err, data) => {
        if (!err){
            res.send("1");
        } else {
            res.send("2");
        }
    })
}

function Check(req, res) {
    const hairdresser_id = req.body.hairdresser_id;
    db.query("SELECT * FROM staff WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data)
        }
        else {
            res.send("2")
        }
    })
}

function Update(req, res) {
    const { staff_id, name, surname, position, hairdresser_id } = req.body;
    const newData = {
        name,
        surname,
        position
    }
    db.query("UPDATE staff SET ? WHERE staff_id = ? AND hairdresser_id = ?", [newData, staff_id, hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            res.send("2");
        }
    })
}

function Remove(req, res) {
    const { staff_id, hairdresser_id } = req.body;
    db.query("DELETE FROM staff WHERE staff_id = ? AND hairdresser_id = ?", [staff_id, hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            res.send("2");
        }
    })
}

function List(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT * FROM staff WHERE hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send("2")
        }
        
    })
}

function addService(req, res) {
    const {staff_id, staffService, hairdresser_id} = req.body;
    const newData = {
        staff_id,
        hairdresser_id,
        service: staffService
    }
    db.query("SELECT * FROM staff_service WHERE staff_id = ? AND hairdresser_id = ? AND service = ?", [staff_id, hairdresser_id, staffService], (err, data) => {
        if (!err) {
            if (data.length>0) {
                res.send("3");
            } else {
                db.query("INSERT INTO staff_service SET ?", newData, (err, success) => {
                    if (!err) {
                        res.send("1");
                    } else {
                        console.log(err2);
                        res.send("2");
                    }
                })
            }
        } else {
            console.log(err);
            res.send("2");
        }
    })
}

function listService(req, res) {
    const { hairdresser_id } = req.body;
    db.query("SELECT t1.staff_service_id,t3.staff_id,t3.name,t3.surname,t1.service FROM staff_service AS t1 INNER JOIN hairdressers AS t2 ON t1.hairdresser_id = t2.hairdresser_id INNER JOIN staff t3 ON t1.staff_id = t3.staff_id WHERE t1.hairdresser_id = ?", [hairdresser_id], (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send("2")
        }
        
    })
}

function removeService(req, res) {
    const { service_id, hairdresser_id } = req.body;
    db.query("DELETE FROM staff_service WHERE staff_service_id = ? AND hairdresser_id = ?", [service_id, hairdresser_id], (err, data) => {
        if (!err) {
            res.send("1");
        }
        else {
            res.send("2");
        }
    })
}

module.exports = { Add, Check, Update, Remove, List, addService, listService, removeService }