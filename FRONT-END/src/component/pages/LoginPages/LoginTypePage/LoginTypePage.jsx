import React from 'react';
import "./LoginTypePage.css"
import logo from "../../../../img/intro_logo.png";

function LoginTypePage() {

    function goUserLogin() {
        window.location.href="/user/login";
    }

    function goHairdresserLogin() {
        window.location.href="/hairdresser/login";
    }

    function goAdminLogin() {
        window.location.href="/admin/login";
    }

    return (
        <>
            <div class="container my-5 gradient-form">
                <div class="row">
                    <div class="col-sm-6 mb-5">
                        <div class="d-flex flex-column">
                            <div class="text-center">
                            <img src={logo}
                                    class="logo-img image-settings" alt="logo" />
                                    <h4 class="mt-1 mb-5 pb-1">Müşteri Sadakat Sistemi</h4>
                            </div>

                            <p><b>Giriş türü:</b></p>

                            <div class="text-center pt-1 mb-5 pb-1">
                                <button onClick={goUserLogin} type="submit" class="btn btn-primary mb-4 w-100">Kullanıcı Girişi</button>
                                <button onClick={goHairdresserLogin} type="submit" class="btn btn-warning mb-4 w-100">Kuaför Girişi</button>
                                <button onClick={goAdminLogin} type="submit" class="btn btn-danger mb-4 w-100">Yönetici Girişi</button>
                            </div>

                        </div>
                    </div>

                    <div class="col-sm-6">
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

export default LoginTypePage;