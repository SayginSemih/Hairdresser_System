import { useEffect, useState, useRef } from "react";
import "./HairdresserCheckEmail.css"
import axios from "axios";

function HairdresserCheckEmail() {

    const inputMail = useRef();
    const hairdresserSendMailMessage = useRef();

    function btnSendMail() {

        // Change Password Kodu Oluşturma
        function createCpCode() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const hairdresserMail = inputMail.current.value;
        const cpcode = createCpCode();

        if (!hairdresserMail) {
            hairdresserSendMailMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen bir mail adresi giriniz!
                </div>
            `;
        } else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-forgot-password-send-mail", {
                hairdresserMail,
                cpcode
            }).then(response => {
                if (response.data=="1"){
                    hairdresserSendMailMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Şifre sıfırlama talebi mail hesabınıza gönderildi, lütfen mailinizi kontrol ediniz!
                    </div>
                `;
                }
                else if (response.data=="2"){
                    hairdresserSendMailMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Bu mail hesabı kullanılmamaktadır!
                    </div>
                `;
                }
            })
        }
    }

    return (
        <>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title text-center mb-4">Şifre Sıfırlama</h4>
                                    <div class="form-group">
                                        <label for="inputEmail">E-mail Adresiniz</label>
                                        <input ref={inputMail} type="email" class="form-control" id="inputEmail" placeholder="E-mail adresinizi girin" />
                                    </div>
                                    <div ref={hairdresserSendMailMessage}></div>
                                    <button onClick={btnSendMail} type="submit" class="btn btn-primary btn-block mt-2">Şifremi Sıfırla</button>
                                    <br />
                                    <a href="/hairdresser/login" class="text-muted">Giriş sayfasına dön.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HairdresserCheckEmail
