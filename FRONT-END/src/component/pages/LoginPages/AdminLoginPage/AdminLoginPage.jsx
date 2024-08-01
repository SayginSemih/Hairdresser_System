import React, { useRef , useState , useEffect } from 'react';
import "./AdminLoginPage.css"
import logo from "../../../../img/intro_logo.png";
import axios from "axios";

function AdminLoginPage() {

    const inputUsername = useRef();
    const inputPasswd = useRef();
    const adminLogginMessage = useRef();

    function btnLogin() {
        const username = inputUsername.current.value;
        const passwd = inputPasswd.current.value;

        if (!username || !passwd) {
            adminLogginMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-login", {
                username,
                passwd
            }).then(response => {
                if (response.data.data == 1) {
                    localStorage.setItem("adminToken", response.data.token)
                    window.location.href = "/admin";
                }
                else if (response.data.data == 2) {
                    adminLogginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Kullanıcı adı veya parolanız hatalı!
                        </div>
                    `;
                }
            })
        }
    }

    return (
        <>
            <div class="container my-5 gradient-form">
                <div class="row">
                    <div class="col-sm-6 mb-5">
                        <div class="d-flex flex-column ms-5">
                            <div class="text-center">
                                <img src={logo}
                                    class="logo-img image-settings" alt="logo" />
                                <h4 class="mt-1 mb-5 pb-1">Müşteri Sadakat Sistemi</h4>
                            </div>

                            <p><b>Admin girişi :</b></p>

                            <div class="form-group mb-4">
                                <label for="email">Kullanıcı Adı</label>
                                <input ref={inputUsername} type="text" class="form-control" id="username" placeholder="Kullanıcı adınız" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="password">Şifre</label>
                                <input ref={inputPasswd} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <div ref={adminLogginMessage}></div>
                                <button onClick={btnLogin} type="submit" class="btn btn-primary mb-4 w-100">Giriş Yap</button>
                            </div>

                        </div>
                    </div>

                    <div class="col-sm-6 mb-5">
                        <div class="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
                            <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">Neden bizi tercih etmelisiniz?</h4>
                                <p class="small mb-0">
                                    Müşteri Sadakat Sistemi, işletmenizin müşterileriyle etkileşimini optimize etmek ve sadakatlerini artırmak için tasarlanmış yenilikçi bir çözümdür. Bu uygulama, müşterilerinizle daha derin ve anlamlı ilişkiler kurmanızı sağlar, böylece onların markanıza olan bağlılığını güçlendirir ve tekrar eden satın alma davranışlarını teşvik eder.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLoginPage;