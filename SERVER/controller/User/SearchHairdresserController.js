const db = require("../Database/db.js");

function Search(req, res) {
    const { find } = req.body;
    db.query("SELECT * FROM hairdressers WHERE name LIKE '%" + find +"%' AND sub_day > 0", (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send("2");
        }
    })
}

module.exports = Search;