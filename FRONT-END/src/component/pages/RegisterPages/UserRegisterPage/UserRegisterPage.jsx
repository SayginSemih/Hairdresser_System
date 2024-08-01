import React, { useRef } from 'react';
import "./UserRegisterPage.css"
import logo from "../../../../img/intro_logo.png";
import axios from "axios";

function UserRegisterPage() {

    // Register variable
    const refPhone = useRef();
    const refMail = useRef();
    const refPassword = useRef();
    const refRePassword = useRef();
    const refName = useRef();
    const refSurname = useRef();
    const userRegMessage = useRef();

    // Kayıt Ol tuşuna basıldığında çalışacak fonksiyon
    function btnSubmit() {

        // Input değerlerini variableye atama
        const userPhone = refPhone.current.value;
        const userMail = refMail.current.value;
        const userPassword = refPassword.current.value;
        const userRePassword = refRePassword.current.value;
        const userName = refName.current.value;
        const userSurname = refSurname.current.value;

        // Hesap doğrulama kodu oluşturma fonskiyonu
        function createApprovedCode() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        // Kullanıcı unique kod oluşturma fonksiyonu
        function createUniqueCode() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 20; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        // Şifre ve Şifre Tekrar Inputlarının doğrulandığı yer
        if (userPassword == userRePassword) {
            userRegMessage.current.innerHTML = "";
            const Approved = createApprovedCode();
            const Unique = createUniqueCode();
            // Girilin Inputların tümünün dolu olma kontrolünün yapıldığı yer
            if (!userPhone || !userMail || !userPassword || !userRePassword || !userName || !userSurname) {
                userRegMessage.current.innerHTML = "";
                userRegMessage.current.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Tüm alanlar dolu olmalıdır!
                    </div>
                `;
            }
            else {
                // Sunucu tarafına post isteği
                axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/register-user", {
                    userPhone,
                    userMail,
                    userPassword,
                    userName,
                    userSurname,
                    Approved,
                    Unique
                }).then(response => {
                    // Kayıt işlemi başarılıysa response 1 döner
                    if (response.data == 1) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
                            <div class="alert alert-success" role="alert">
                                Kayıt işlemi başarıyla tamamlandı!
                            </div>
                        `;
                    }
                    // Kayıt işlemi başarısızsa response 2 döner
                    else if (response.data == 2) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
                            <div class="alert alert-danger" role="alert">
                                Kayıt işlemi sırasında bir hata meydana geldi!
                            </div>
                        `;
                    }
                    // Mail veya telefon kullanılıyorsa response 3 döner
                    else if (response.data == 3) {
                        userRegMessage.current.innerHTML = "";
                        userRegMessage.current.innerHTML = `
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
            userRegMessage.current.innerHTML = "";
            userRegMessage.current.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Şifreler aynı olmalıdır!
                </div>
            `;
        }
    }

    // HTML KISMI
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

                            <p><b>Kullanıcı kayıt :</b></p>

                            <div class="form-group mb-4">
                                <label for="email">Telefon</label>
                                <input ref={refPhone} type="text" class="form-control" id="email" placeholder="Telefon giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="email">E-Mail</label>
                                <input ref={refMail} type="text" class="form-control" id="email" placeholder="E-Mail giriniz" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="password">Şifre</label>
                                <input ref={refPassword} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Şifre tekrar</label>
                                <input ref={refRePassword} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Adınız</label>
                                <input ref={refName} type="text" class="form-control" id="password" placeholder="Adınızı giriniz" />
                            </div>


                            <div class="form-group mb-4">
                                <label for="password">Soyadınız</label>
                                <input ref={refSurname} type="text" class="form-control" id="password" placeholder="Soyadınızı giriniz" />
                            </div>
                            <div ref={userRegMessage}>

                            </div>
                            <div class="text-center pt-1 mb-5 pb-1">
                                <button onClick={btnSubmit} type="submit" class="btn btn-primary mb-4 w-100">Kayıt Ol</button>
                                <a href="/user/login" class="text-muted">Giriş sayfasına dön.</a>
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

export default UserRegisterPage;