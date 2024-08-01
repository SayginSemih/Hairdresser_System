import React, { useRef } from 'react';
import "./HairdresserLoginPage.css"
import logo from "../../../../img/intro_logo.png";
import axios from "axios";

function HairdresserLoginPage() {

    const inputEmailOrPhone = useRef();
    const inputPasswd = useRef();
    const hairdresserLoginMessage = useRef();

    function goRegister() {
        window.location.href = "/hairdresser/register";
    }

    function btnLogin() {
        const hairdresserMailOrPhone = inputEmailOrPhone.current.value;
        const hairdresserPasswd = inputPasswd.current.value;

        if (!hairdresserMailOrPhone || !hairdresserPasswd) {
            hairdresserLoginMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-login", {
                hairdresserMailOrPhone,
                hairdresserPasswd
            }).then(response => {
                if (response.data.data == 1) {
                    localStorage.setItem("hairdresserToken", response.data.token)
                    window.location.href = "/hairdresser/my-hairdresser";
                }
                else if (response.data.data == 2) {
                    hairdresserLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Parolanız hatalı!
                        </div>
                    `;
                }
                else if (response.data.data == 3) {
                    hairdresserLoginMessage.current.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Bu kullanıcı adı veya telefon numarası kullanılmıyor!
                        </div>
                    `;
                }
                else if (response.data.data == 4) {
                    hairdresserLoginMessage.current.innerHTML = `
                        <div class="alert alert-warning" role="alert">
                            Hesabınızın yönetici tarafından doğrulanması bekleniyor!
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

                            <p><b>Kuaför girişi :</b></p>

                            <div class="form-group mb-4">
                                <label for="email">E-mail / Telefon</label>
                                <input ref={inputEmailOrPhone} type="email" class="form-control" id="email" placeholder="E-mail / Telefon giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="password">Şifre</label>
                                <input ref={inputPasswd} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <div ref={hairdresserLoginMessage}></div>
                                <button onClick={btnLogin} type="submit" class="btn btn-primary mb-4 w-100">Giriş Yap</button>
                                <a href="/hairdresser/forgotpassword" class="text-muted">Şifrenizi mi unuttunuz?</a>
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

export default HairdresserLoginPage;