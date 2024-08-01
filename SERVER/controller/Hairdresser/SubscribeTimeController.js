const db = require("./../Database/db.js");

function SubscribeTimeController() {
    db.query("SELECT * FROM hairdressers", (err, data) => {
        const currentDate = new Date();
        if (currentDate.getHours() == "0" && currentDate.getMinutes() == "0")
        {
            data.forEach(d => {
                if (d.sub_day != 0) {
                    const nc = Number(d.sub_day)-Number(1);
                    db.query("UPDATE hairdressers SET sub_day = ? WHERE hairdresser_id = ?", [nc, d.hairdresser_id], (err2, success) => {
                        if (!err2) {
    
                        } else {
                            console.log(err2)
                        }
                    })
                }
            })
            console.log("Tüm abonelerin abonelik süresi başarıyla azaltıldı!");
            console.log(currentDate.getHours() + ":" + currentDate.getMinutes())
        }
    })
}

module.exports = SubscribeTimeController;