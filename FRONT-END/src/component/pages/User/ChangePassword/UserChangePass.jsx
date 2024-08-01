import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserChangePass.css"

function UserChangePass() {

    const [userdata, setData] = useState([]);
    const inputPassword = useRef();
    const inputRePassword = useRef();
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
        const userPassword = inputPassword.current.value;
        const userRePassword = inputRePassword.current.value;

        if (!userPassword || !userRePassword) {
            userUpdateMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            if (userPassword == userRePassword) {
                const pwdControl = String(userPassword)
                if (pwdControl.length > 5) {
                    axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-changepassword", {
                        userPassword,
                        userID: userdata.user_id
                    }).then(response => {
                        if (response.data == "1") {
                            userUpdateMessage.current.innerHTML = `
                            <div class="alert alert-success mt-2" role="alert">
                                Şifreniz başarıyla güncellendi!
                            </div>
                        `;
                            setTimeout(function () {
                                localStorage.removeItem("userToken");
                            }, 1000);
                        }
                        else if (response.data == "2") {
                            userUpdateMessage.current.innerHTML = `
                            <div class="alert alert-danger mt-2" role="alert">
                                Şifre değiştirme sırasında bir hata meydana geldi!
                            </div>
                        `;
                        }
                    })
                }
                else {
                    userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreniz 5 haneden büyük olmalıdır!
                    </div>
                `;
                }
            }
            else {
                userUpdateMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreler aynı olmalıdır!
                    </div>
                `;
            }
        }
    }

    return (
        <>
            <UserHeader />

            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                Kullanıcı Şifre Değiştir
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="password">Şifre</label>
                                    <input ref={inputPassword} type="password" class="form-control" id="password" placeholder="Şifreniz" />
                                </div>
                                <div class="form-group">
                                    <label for="repassword">Tekrar Şifreniz</label>
                                    <input ref={inputRePassword} type="password" class="form-control" id="repassword" placeholder="Tekrar Şifreniz" />
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

export default UserChangePass
