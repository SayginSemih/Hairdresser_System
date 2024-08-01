const express = require("express");
const router = express.Router();
const approved = require("../controller/Admin/adminApprovedController.js");
const details = require("../controller/Admin/ApplicationDetailsController.js");
const hairdresser = require("../controller/Admin/hairdresserController.js");
const subscribe = require("../controller/Admin/subscribeDetailsController.js");

// ONAY BEKLEYEN KUAFÖRLERİN ADMİN TARAFINDAN ONAYLANDIĞI API
router.post("/approved-hairdresser", (req, res) => {
    approved.approved(req, res);
})

// ONAY BEKLEYEN KUAFÖRLERİ LİSTELEYEN API
router.get("/admin-check-approved", (req, res) => {
    approved.approvedList(req, res)
})

// ONAY BEKLEYEN KUAFÖR SAYISI
router.get("/approved-count", (req, res) => {
    details.approvedCount(req, res);
})

// KULLANICI SAYISI
router.get("/users-count", (req, res) => {
    details.userCount(req, res);
})

// KUAFÖR SAYISI
router.get("/hairdressers-count", (req, res) => {
    details.hairdresserCount(req, res);
})

// ABONE SAYISI
router.get("/subscribers-count", (req, res) => {
    details.subscribersCount(req, res);
})

// KUAFÖRLERİ GETİRİR
router.get("/admin-get-hairdressers", (req, res) => {
    hairdresser.Get(req, res);
})

// KUAFÖRÜ GÜNCELER
router.post("/admin-update-hairdressers", (req, res) => {
    hairdresser.Update(req, res)
})

// KUAFÖRÜ SİLER
router.post("/admin-remove-hairdressers", (req, res) => {
    hairdresser.Remove(req, res)
})

// ABONELİK DETAYLARI
router.get("/admin-subscribe-details", (req, res) => {
    subscribe.Get(req, res)
})


module.exports = router;