const express = require("express");
const router = express.Router();
const settings = require("./../controller/Hairdresser/hairdresserSettingsController.js");
const staff = require("./../controller/Hairdresser/staffController.js");
const appointments = require("./../controller/Hairdresser/AppointmentsController.js");
const service = require("./../controller/Hairdresser/ServiceController.js");
const getUser = require("./../controller/Hairdresser/getUserController.js");
const loyalty = require("./../controller/Hairdresser/loyaltyPointController.js");
const notification = require("./../controller/Hairdresser/NotificationController.js");
const payTR = require("./../controller/Hairdresser/SubscribeController.js");

// KUAFÖR BİLGİLERİ GÜNCELLEME
router.post("/hairdresser/settings/profile-update", (req, res) => {
    settings.Update(req, res);
})

// KUAFÖR ŞİFRE GÜNCELLEME
router.post("/hairdresser/settings/change-password", (req, res) => {
    settings.ChangePassword(req, res);
})

// KUAFÖR PERSONEL LİSTELEME
router.post("/hairdresser/staff/check-staff", (req, res) => {
    staff.Check(req, res);
})

// KUAFÖR PERSONEL EKLEME
router.post("/hairdresser/staff/add-staff", (req, res) => {
    staff.Add(req, res);
})

// KUAFÖR PERSONEL GÜNCELLEME
router.post("/hairdresser/staff/update-staff", (req, res) => {
    staff.Update(req, res);
})

// KUAFÖR PERSONEL SİLME
router.post("/hairdresser/staff/remove-staff", (req, res) => {
    staff.Remove(req, res);
})

// KUAFÖR PERSONEL LİSTELEME
router.post("/hairdresser/staff/get-staff", (req, res) => {
    staff.List(req, res);
})

// KUAFÖR PERSONELE HİZMET EKLEME
router.post("/hairdresser/staff/add-staff-service", (req, res) => {
    staff.addService(req, res);
})

// KUAFÖR PERSONELE HİZMETLERİ LİSTELEME
router.post("/hairdresser/staff/list-staff-service", (req, res) => {
    staff.listService(req, res);
})

// KUAFÖR PERSONELE HİZMETLERİ SİLME
router.post("/hairdresser/staff/remove-staff-service", (req, res) => {
    staff.removeService(req, res);
})

// PERSONEL RANDEVU SAATLERİ OLUŞTURMA
router.post("/hairdresser/staff/create-appointments", (req, res) => {
    appointments.Create(req, res);
})

// HAFTALIK RANDEVU SAATLERİ OLUŞTURMA
router.post("/hairdresser/staff/create-weekly-appointments", (req, res) => {
    appointments.CreateWeekly(req, res);
});

// AYLIK RANDEVU SAATLERİ OLUŞTURMA
router.post("/hairdresser/staff/create-monthly-appointments", (req, res) => {
    appointments.CreateMonthly(req, res);
});

// PERSONEL RANDEVU SAATLERİNİ LİSTELEME
router.post("/hairdresser/staff/list-appointments", (req, res) => {
    appointments.Check(req, res);
})

// PERSONEL RANDEVU SAATLERİNİ SİLME
router.post("/hairdresser/staff/remove-appointments", (req, res) => {
    appointments.Remove(req, res);
})

// RANDEVUARI GETİRİR
router.post("/hairdresser/user/get-appointments", (req, res) => {
    appointments.List(req, res);
})

// RANDEVUYU KAPATMA
router.post("/hairdresser/user/close-appointments", (req, res) => {
    appointments.Close(req, res);
})

// HİZMETLERİ GETİRME
router.post("/hairdresser/services/list-service", (req, res) => {
    service.List(req, res);
})

// HİZMET OLUŞTURMA
router.post("/hairdresser/services/create-service", (req, res) => {
    service.Create(req, res);
})

// HİZMET GÜNCELLEME
router.post("/hairdresser/services/update-service", (req, res) => {
    service.Update(req, res);
})

// HİZMET SİLME
router.post("/hairdresser/services/remove-service", (req, res) => {
    service.Remove(req, res);
})

// KULLANICIYI GETİRME
router.post("/hairdresser/get-user", (req, res) => {
    getUser(req, res);
})

// SADAKAT PUANI KAZANMA
router.post("/hairdresser/loyalty-earned", (req, res) => {
    loyalty.Earned(req, res);
})

// SADAKAT PUANI KULLANMA
router.post("/hairdresser/loyalty-redeemed", (req, res) => {
    loyalty.Redeemed(req, res);
})

// MÜŞTERİLERE BİLDİRİM GÖNDERME
router.post("/hairdresser-send-notification", (req, res) => {
    notification.Send(req, res);
})

// PAYTR TOKEN ALMA
router.post("/hairdresser-payment", (req, res) => {
    payTR.getToken(req, res);
})

// PAYTR GERİ BİLDİRİM
router.post("/hairdresser-payment-callback", (req, res) => {
    payTR.Callback(req, res);
})

module.exports = router;