import { useEffect, useState, useRef } from "react";
import "./UserChangePassword.css"
import axios from "axios";
import { useParams } from "react-router-dom";

function UserChangePassword() {

    const { uniquecode, cpcode } = useParams();
    const inputPassword = useRef();
    const inputRePassword = useRef();
    const userChangePasswordMessage = useRef();

    function btnChangePassword() {
        const userPassword = inputPassword.current.value;
        const userRePassword = inputRePassword.current.value;

        if (userPassword == userRePassword) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-forgot-change-password", {
                userPassword,
                uniquecode,
                cpcode
            }).then(response => {
                if (response.data=="1") {
                    userChangePasswordMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Şifreniz başarıyla değiştirildi!
                    </div>
                `;
                }
                else {
                    userChangePasswordMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreniz değiştirme işlemi sırasında bir hata meydana geldi!
                    </div>
                `;
                }
            })
        }
        else {
            userChangePasswordMessage.current.innerHTML = `
                <div class="alert alert-danger mt-2" role="alert">
                    Şifreler eşleşmiyor!
                </div>
            `;
        }

    }

    return (
        <>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title text-center mb-4">Şifre Değiştirme</h4>
                                <div class="form-group">
                                    <label for="newPassword">Yeni Şifre</label>
                                    <input ref={inputPassword} type="password" class="form-control" id="newPassword" placeholder="Yeni şifrenizi girin" />
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Şifreyi Tekrar Girin</label>
                                    <input ref={inputRePassword} type="password" class="form-control" id="confirmPassword" placeholder="Yeni şifreyi tekrar girin" />
                                </div>
                                <div ref={userChangePasswordMessage}></div>
                                <button onClick={btnChangePassword} type="submit" class="btn btn-primary btn-block mt-2">Şifreyi Değiştir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserChangePassword
