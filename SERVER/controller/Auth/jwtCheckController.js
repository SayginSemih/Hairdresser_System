const db = require("../Database/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function checkUser(req, res) {
    const token = req.body.token
    jwt.verify(token, 'user_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ data: 2 });
        }

        // Doğrulanmış token bilgilerini kullanarak işlem yapabiliriz
        res.json({ data: 1, userdata: decoded });
    });
}

function checkHairdresser(req, res) {
    const token = req.body.token
    jwt.verify(token, 'hairdresser_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ data: 2 });
        }

        // Doğrulanmış token bilgilerini kullanarak işlem yapabiliriz
        res.json({ data: 1, userdata: decoded });
    });
}

function checkAdmin(req, res) {
    const token = req.body.token
    jwt.verify(token, 'admin_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ data: 2 });
        }

        // Doğrulanmış token bilgilerini kullanarak işlem yapabiliriz
        res.json({ data: 1, userdata: decoded });
    });
}

module.exports = { checkUser, checkHairdresser, checkAdmin }