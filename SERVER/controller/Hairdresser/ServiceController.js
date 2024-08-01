const db = require("../Database/db.js");
const multer = require('multer');

// Multer Middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Resimlerin yükleneceği klasör
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Yükleme sırasında dosya adını belirleme
    }
});

const upload = multer({ storage: storage }).single(('image'));

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

function Create(req, res) {
    upload(req, res, (err) => {
        let { service_name, service_description, price, point, hairdresser_id } = req.body;
        if (point < 10) {
            point = "0.0" + point;
        }
        else if (point == 100) {
            point = 1.00
        }
        else {
            point = "0." + point;
        }
        let newData = []
        try {
            newData = {
                hairdresser_id,
                service_name,
                service_description,
                price,
                point: Number(point),
                image: req.file.filename
            }
        } catch {
            newData = {
                hairdresser_id,
                service_name,
                service_description,
                price,
                point: Number(point),
                image: 'Yok'
            }
        }
        db.query("INSERT INTO services SET ?", [newData], (err, data) => {
            if (!err) {
                res.send("1")
            }
            else {
                console.log(err)
                res.send("2")
            }
        })
    })
}

function Update(req, res) {
    upload(req, res, (err) => {
        let { service_name, service_description, price, point, hairdresser_id, service_id } = req.body;
        let newData = []
        try {
            newData = {
                hairdresser_id,
                service_name,
                service_description,
                price,
                point: Number(point),
                image: req.file.filename
            }
        } catch {
            newData = {
                hairdresser_id,
                service_name,
                service_description,
                price,
                point: Number(point),
                image: 'Yok'
            }
        }
        db.query("UPDATE services SET ? WHERE hairdresser_id = ? AND service_id = ?", [newData, hairdresser_id, service_id], (err, data) => {
            if (!err) {
                res.send("1")
            }
            else {
                console.log(err)
                res.send("2")
            }
        })
    })
}

function Remove(req, res) {
    const { service_id, hairdresser_id } = req.body;
    db.query("DELETE FROM services WHERE hairdresser_id = ? AND service_id = ?", [hairdresser_id, service_id], (err, data) => {
        if (!err) {
            res.send("1")
        } else {
            console.log(err)
            res.send("2")
        }
    })
}

module.exports = { List, Create, Update, Remove }