import React, { useRef } from 'react';
import "./HairdresserRegisterPage.css"
import logo from "../../../../img/intro_logo.png";
import axios from "axios";

function HairdresserRegisterPage() {

    const inputPhone = useRef();
    const inputMail = useRef();
    const inputPasswd = useRef();
    const inputRePasswd = useRef();
    const inputHairdresserName = useRef();
    const inputHairdresserAddress = useRef();
    const hairdresserRegisterMessage = useRef();

    function btnRegister() {
        const hairdresserPhone = inputPhone.current.value;
        const hairdresserMail = inputMail.current.value;
        const hairdresserPasswd = inputPasswd.current.value;
        const hairdresserRePasswd = inputRePasswd.current.value;
        const hairdresserName = inputHairdresserName.current.value;
        const hairdresserAddress = inputHairdresserAddress.current.value;

        if (hairdresserPasswd == hairdresserRePasswd) {
            hairdresserRegisterMessage.current.innerHTML = "";
            // Girilin Inputların tümünün dolu olma kontrolünün yapıldığı yer
            if (!hairdresserPhone || !hairdresserMail || !hairdresserPasswd || !hairdresserRePasswd || !hairdresserName || !hairdresserAddress) {
                hairdresserRegisterMessage.current.innerHTML = "";
                hairdresserRegisterMessage.current.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Tüm alanlar dolu olmalıdır!
                    </div>
                `;
            }
            else {
                // Sunucu tarafına post isteği
                axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/register-hairdresser", {
                    hairdresserPhone,
                    hairdresserMail,
                    hairdresserPasswd,
                    hairdresserName,
                    hairdresserAddress
                }).then(response => {
                    // Kayıt işlemi başarılıysa response 1 döner
                    if (response.data == 1) {
                        hairdresserRegisterMessage.current.innerHTML = "";
                        hairdresserRegisterMessage.current.innerHTML = `
                            <div class="alert alert-success" role="alert">
                                Kayıt işlemi başarıyla tamamlandı!
                            </div>
                        `;
                    }
                    // Kayıt işlemi başarısızsa response 2 döner
                    else if (response.data == 2) {
                        hairdresserRegisterMessage.current.innerHTML = "";
                        hairdresserRegisterMessage.current.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                Kayıt işlemi sırasında bir hata meydana geldi!
                            </div>
                        `;
                    }
                    // Mail veya telefon kullanılıyorsa response 3 döner
                    else if (response.data == 3) {
                        hairdresserRegisterMessage.current.innerHTML = "";
                        hairdresserRegisterMessage.current.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                Bu mail adresi veya telefon zaten kullanılmaktadır!
                            </div>
                        `;
                    }
                })
            }
        }
        else {
            // Şifreler aynı değilse burası çalışır!
            hairdresserRegisterMessage.current.innerHTML = "";
            hairdresserRegisterMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Şifreler aynı olmalıdır!
                </div>
            `;
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

                            <p><b>Kuaför kayıt :</b></p>

                            <div class="form-group mb-4">
                                <label for="email">Telefon</label>
                                <input ref={inputPhone} type="text" class="form-control" id="phone" placeholder="Telefon giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="email">E-Mail</label>
                                <input ref={inputMail} type="text" class="form-control" id="email" placeholder="Mail adresi giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="password">Şifre</label>
                                <input ref={inputPasswd} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Şifre tekrar</label>
                                <input ref={inputRePasswd} type="password" class="form-control" id="repassword" placeholder="Şifreniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Kuaför İsmi</label>
                                <input ref={inputHairdresserName} type="text" class="form-control" id="name" placeholder="Kuaför ismi giriniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Adres</label>
                                <input ref={inputHairdresserAddress} type="text" class="form-control" id="address" placeholder="Adres giriniz" />
                            </div>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <div ref={hairdresserRegisterMessage}></div>
                                <button onClick={btnRegister} type="submit" class="btn btn-primary mb-4 w-100">Kayıt Ol</button>
                                <a href="/hairdresser/login" class="text-muted">Giriş sayfasına dön.</a>
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

export default HairdresserRegisterPage;