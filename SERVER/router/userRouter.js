const express = require("express");
const router = express.Router();
const userUpdate = require("./../controller/User/userUpdateController.js");
const userChangePassword = require("./../controller/User/userChangePasswordController.js");
const getHairdressers = require("./../controller/User/userCheckHairdresserController.js");
const feedback = require("./../controller/User/userFeedbackController.js");
const apponitments = require("./../controller/User/AppointmentsController.js");
const service = require("./../controller/User/ServiceController.js");
const loyaltypoints = require("./../controller/User/LoyaltyPointsController.js");
const notifications = require("./../controller/User/NotificationController.js");

// KULLANICI BİLGİLERİNİ GÜNCELLEME
router.post("/user-update", (req, res) => {
    userUpdate(req, res);
})

// KULLANICI ŞİFRE GÜNCELLEME
router.post("/user-changepassword", (req, res) => {
    userChangePassword(req, res);
})

// KULLAN0ICI ANASAYFADA KUAFÖRLERİN YÜKLENMESİ
router.get("/check-hairdresser", (req, res) => {
    getHairdressers(req, res);
})

// KULLAN0ICI KUAFÖR YORUM VE RANDEVU SAYFASI
router.post("/user-get-hairdresser", (req, res) => {
    feedback.getHairdresser(req, res);
})

// KULLAN0ICI KUAFÖR YORUM VE PUANLARININ GÖNDERİLMESİ
router.post("/user-send-feedback", (req, res) => {
    feedback.sendFeedback(req, res);
})

// KULLAN0ICI KUAFÖR YORUM VE PUANLARININ YÜKLENMESİ
router.post("/user-get-hairdresser-feedback", (req, res) => {
    feedback.getUserFeedback(req, res);
})

// KULLAN0ICI MÜSAİT RANDEVULARIN YÜKLENMESİ
router.post("/user-get-avaliable-apponitments", (req, res) => {
    apponitments.Avaliable(req, res);
})

// KULLAN0ICI RANDEVU OLUŞTURMA
router.post("/user-create-apponitments", (req, res) => {
    apponitments.Create(req, res);
})

// KULLAN0ICI AKTİF RANDEVULARI
router.post("/user-active-apponitments", (req, res) => {
    apponitments.Active(req, res);
})

// KULLAN0ICI RANDEVU İPTALİ
router.post("/user-cancel-apponitments", (req, res) => {
    apponitments.Cancel(req, res);
})

// SEÇİLEN KUAFÖRÜN HİZMETLERİNİ GÖRME
router.post("/hairdresser-get-service", (req, res) => {
    service.List(req, res);
})

// SEÇİLEN KUAFÖRÜN FİYATLARI GİZLİ Mİ KONTROLÜ
router.post("/hairdresser-get-hidden-price", (req, res) => {
    service.hiddenPrice(req, res);
})

// SADAKAT PUANLARI LİSTESİ
router.post("/get-loyaltypoints", (req, res) => {
    loyaltypoints.Get(req, res);
})

// BİLDİRİMLER
router.post("/get-notifications", (req, res) => {
    notifications.Get(req, res);
})


module.exports = router;