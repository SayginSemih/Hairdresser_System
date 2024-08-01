import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserProfile.css"

function UserProfile() {

    const [userdata, setData] = useState([]);
    const inputName = useRef();
    const inputSurname = useRef();
    const inputMail = useRef();
    const inputPhone = useRef();
    const userUpdateMessage = useRef();

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-user", {
                token: localStorage.getItem("userToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                }
            })
        }
    }, [])

    function btnUpdate() {
        const userName = inputName.current.value;
        const userSurname = inputSurname.current.value;
        const userMail = inputMail.current.value;
        const userPhone = inputPhone.current.value;

        if (!userName || !userSurname || !userMail || !userPhone) {
            userUpdateMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else{
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-update", {
                userName,
                userSurname,
                userMail,
                userPhone,
                userID: userdata.user_id
            }).then(response => {
                if (response.data=="1") {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Kullanıcı bilgileriniz başarıyla güncellendi!
                    </div>
                `;
                const newData = {
                    name: userName,
                    surname: userSurname,
                    email: userMail,
                    phone_number: userPhone,
                    user_id: userdata.user_id
                }
                setData(newData);
                }
                else if (response.data=="2") {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-alert mt-2" role="alert">
                        Güncelleme esnasında bir hata meydana geldi!
                    </div>
                `;
                }
            })
        }
    }

    return (
        <>
            <UserHeader />

            <div class="container mt-5">
                <div class="card">
                    <div class="card-header">
                        Kullanıcı Bilgileri
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label">Ad Soyad</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control-plaintext" id="name" value={userdata.name + " " + userdata.surname} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-3 col-form-label">E-mail</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control-plaintext" id="email" value={userdata.email} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-3 col-form-label">Telefon</label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control-plaintext" id="phone" value={userdata.phone_number} readonly />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-3 col-form-label">QR Code</label>
                            <div class="col-sm-9">
                                <img src={`${import.meta.env.VITE_REACT_APP_SERVER_HOSTING}/${userdata.unique_code}.png`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                Kullanıcı Profilini Düzenle
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="name">Ad</label>
                                    <input ref={inputName} type="text" class="form-control" id="name" defaultValue={userdata.name} placeholder="Adınız" />
                                </div>
                                <div class="form-group">
                                    <label for="surname">Soyad</label>
                                    <input ref={inputSurname} type="text" class="form-control" id="surname" defaultValue={userdata.surname} placeholder="Soyadınız" />
                                </div>
                                <div class="form-group">
                                    <label for="email">E-mail Adresi</label>
                                    <input ref={inputMail} type="email" class="form-control" id="email" defaultValue={userdata.email} placeholder="E-mail adresiniz" />
                                </div>
                                <div class="form-group">
                                    <label for="phone">Telefon Numarası</label>
                                    <input ref={inputPhone} type="tel" class="form-control" id="phone" defaultValue={userdata.phone_number} placeholder="Telefon numaranız" />
                                </div>
                                <div ref={userUpdateMessage}></div>
                                <button onClick={btnUpdate} type="submit" class="btn btn-primary mt-2">Güncelle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
