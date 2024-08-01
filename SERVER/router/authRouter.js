const express = require("express");
const router = express.Router();
const register = require("./../controller/Auth/registerController.js")
const login = require("./../controller/Auth/loginController.js");
const check = require("./../controller/Auth/jwtCheckController.js");
const verification = require("./../controller/Auth/userVerificationController.js");
const forgotPassword = require("./../controller/Auth/forgotPasswordController.js");
const Search = require("../controller/User/SearchHairdresserController.js");

// KULLAN0ICI KAYIT BÖLÜMÜ
router.post("/register-user", (req, res) => {
    register.userRegister(req, res);
})

// KUAFÖR KAYIT BÖLÜMÜ
router.post("/register-hairdresser", (req, res) => {
    register.hairdresserRegister(req, res);
})

// KULLANICI GİRİŞİ
router.post("/login", (req, res) => {
    login.loginUser(req, res)
})

// KUAFÖR GİRİŞİ
router.post("/hairdresser-login", (req, res) => {
    login.loginHairdresser(req, res)
})

// ADMİN GİRİŞİ
router.post("/admin-login", (req, res) => {
    login.loginAdmin(req, res)
})

// KULLANICI GİRİŞ YAPTI MI KONTROLÜ
router.post("/check-user", (req, res) => {
    check.checkUser(req, res)
})

// KUAFÖR GİRİŞ YAPTI MI KONTROLÜ
router.post("/check-hairdresser", (req, res) => {
    check.checkHairdresser(req, res)
})

// ADMİN GİRİŞ YAPTI MI KONTROLÜ
router.post("/check-admin", (req, res) => {
    check.checkAdmin(req, res)
})

// KULLANICI HESAP ONAYLAMA
router.post("/verification", (req, res) => {
    verification(req, res)
})

// KULLANICIYA ŞİFRE YENİLEME MAİLİ GÖNDERME
router.post("/user-forgot-password-send-mail", (req, res) => {
    forgotPassword.userSendPasswordMail(req, res)
})

// KUAFÖRE ŞİFRE YENİLEME MAİLİ GÖNDERME
router.post("/hairdresser-forgot-password-send-mail", (req, res) => {
    forgotPassword.hairdresserSendPasswordMail(req, res)
})

// KULLANICI ŞİFRE SIFIRLAMA
router.post("/user-forgot-change-password", (req, res) => {
    forgotPassword.userChangePassword(req, res)
})

// KUAFÖR ŞİFRE SIFIRLAMA
router.post("/hairdresser-forgot-change-password", (req, res) => {
    forgotPassword.hairdresserChangePassword(req, res)
})

// KUAFÖR ARA
router.post("/user-find-hairdresser", (req, res) => {
    Search(req, res)
})

module.exports = router;