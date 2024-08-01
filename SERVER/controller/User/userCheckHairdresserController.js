const db = require("../Database/db.js");

function getHairdresser(req, res) {
    db.query("SELECT hairdresser_id, name, address, email, phone_number, filename, rating, sub_day FROM hairdressers WHERE sub_day > 0", (err, data) => {
        res.send(data);
    })
}

module.exports = getHairdresser;