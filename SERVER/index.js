const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const userRouter = require("./router/userRouter.js");
const hairdresserRouter = require("./router/hairdresserRouter.js");
const adminRouter = require("./router/adminRouter.js");
const authRouter = require("./router/authRouter.js");
const SubscribeTimeController = require("./controller/Hairdresser/SubscribeTimeController.js");
const cron = require("node-cron");

// cors middleware
app.use(cors());

// Statik dosyaları sunmak için express middleware kullanımı
app.use(express.static(path.join(__dirname, 'uploads')));

// body-parser middleware'i uygulamaya ekle
app.use(bodyParser.json()); // JSON verilerini işlemek için
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded verileri işlemek için

// Subscribe Time
cron.schedule('* * * * *', SubscribeTimeController);

// Routers
app.use(userRouter);
app.use(hairdresserRouter);
app.use(adminRouter);
app.use(authRouter);

// Start
app.listen(3001, () => {
    console.log("Sunucu 3001 portunda başlatıldı!");
})