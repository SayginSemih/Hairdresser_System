import React, { useRef } from 'react';
import "./UserLoginPage.css"
import logo from "../../../../img/intro_logo.png";
import axios from 'axios';

function UserLoginPage() {

    const mailorphone = useRef();
    const passwd = useRef();
    const userLoginMessage = useRef();

    function goRegister() {
        window.location.href = "/user/register";
    }

    function btnLogin() {
        const userMailOrPhone = mailorphone.current.value;
        const userPasswd = passwd.current.value;

        if (!userMailOrPhone || !userPasswd) {
            userLoginMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/login", {
                userMailOrPhone,
                userPasswd
            }).then(response => {
                if (response.data.data == 1) {
                    localStorage.setItem("userToken", response.data.token)
                    window.location.href = "/user";
                }
                else if (response.data.data == 2) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Parolanız hatalı!
                        </div>
                    `;
                }
                else if (response.data.data == 3) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Bu kullanıcı adı veya telefon numarası kullanılmıyor!
                        </div>
                    `;
                }
                else if (response.data.data == 4) {
                    userLoginMessage.current.innerHTML = `
                        <div class="alert alert-warning" role="alert">
                            Lütfen E-Mail adresinizden hesabınızı doğrulayınız!
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

                            <p><b>Müşteri girişi:</b></p>

                            <div class="form-group mb-4">
                                <label for="email">E-Mail / Telefon</label>
                                <input ref={mailorphone} type="email" class="form-control" id="email" placeholder="E-Mail / Telefon giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="password">Şifre</label>
                                <input ref={passwd} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <div ref={userLoginMessage}></div>
                                <button onClick={btnLogin} type="submit" class="btn btn-primary mb-4 w-100">Giriş Yap</button>
                                <a href="/user/forgotpassword" class="text-muted">Şifrenizi mi unuttunuz?</a>
                            </div>

                            <div class="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <p class="mb-0">Bir hesaba sahip değil misin?</p>
                                <button onClick={goRegister} type="button" class="btn btn-outline-danger mx-2">Tıkla</button>
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

export default UserLoginPage;