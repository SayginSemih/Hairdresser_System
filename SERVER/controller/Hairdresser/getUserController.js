const db = require("./../Database/db.js");

function getUser(req, res) {
    const { unique_code } = req.body;
    db.query("SELECT * FROM users WHERE unique_code = ?", [unique_code], (err, data) => {
        if (!err) {
            res.send(data[0])
        } else {
            console.log(err);
            res.send("2");
        }
    })
}

module.exports = getUser;