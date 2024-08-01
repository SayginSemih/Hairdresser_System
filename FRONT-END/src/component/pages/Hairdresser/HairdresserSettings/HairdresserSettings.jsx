import { useEffect, useRef, useState } from "react";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import axios from "axios";

function HairdresserSettings() {

    const [hairdresserData, setHairdresserData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setHairdresserData(response.data.userdata.data)
                }
            })
        }

        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setHairdresserData(response.data.userdata.data)
                }
            })
        }
    }, [])

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const inputName = useRef();
    const inputAddress = useRef();
    const inputMail = useRef();
    const inputPhone = useRef();
    const inputPassword = useRef();
    const inputRePassword = useRef();
    const inputHiddenPrice = useRef();
    const hairdresserUpdateMessage = useRef();
    const hairdresserCpdMessage = useRef();

    function btnUpdate() {
        const hairdresserName = inputName.current.value;
        const hairdresserAddress = inputAddress.current.value;
        const hairdresserMail = inputMail.current.value;
        const hairdresserPhone = inputPhone.current.value;
        const hairdresserHiddenPrice = inputHiddenPrice.current.value;

        if (!hairdresserName || !hairdresserAddress || !hairdresserMail || !hairdresserPhone || !hairdresserHiddenPrice) {
            hairdresserUpdateMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/settings/profile-update", {
                hairdresserName,
                hairdresserAddress,
                hairdresserMail,
                hairdresserPhone,
                hairdresserHiddenPrice,
                hairdresserID: hairdresserData.hairdresser_id,
                image: selectedFile
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.data == "1") {
                        hairdresserUpdateMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Kuaför bilgileriniz başarıyla güncellendi!
                    </div>
                `;
                    }
                    else if (response.data == "2") {
                        hairdresserUpdateMessage.current.innerHTML = `
                    <div class="alert alert-alert mt-2" role="alert">
                        Güncelleme esnasında bir hata meydana geldi!
                    </div>
                `;
                    }
                })
        }
    }

    function btnChangePassword() {
        const hairdresserPassword = inputPassword.current.value;
        const hairdresserRePassword = inputRePassword.current.value;

        if (!hairdresserPassword || !hairdresserRePassword) {
            hairdresserCpdMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            if (hairdresserPassword == hairdresserRePassword) {
                const pwdControl = String(hairdresserPassword)
                if (pwdControl.length > 5) {
                    axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/settings/change-password", {
                        hairdresserPassword,
                        hairdresserID: hairdresserData.hairdresser_id
                    }).then(response => {
                        if (response.data == "1") {
                            hairdresserCpdMessage.current.innerHTML = `
                            <div class="alert alert-success mt-2" role="alert">
                                Şifreniz başarıyla güncellendi!
                            </div>
                        `;
                            setTimeout(function () {
                                localStorage.removeItem("hairdresserToken");
                            }, 1000);
                        }
                        else if (response.data == "2") {
                            hairdresserCpdMessage.current.innerHTML = `
                            <div class="alert alert-danger mt-2" role="alert">
                                Şifre değiştirme sırasında bir hata meydana geldi!
                            </div>
                        `;
                        }
                    })
                }
                else {
                    hairdresserCpdMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreniz 5 haneden büyük olmalıdır!
                    </div>
                `;
                }
            }
            else {
                hairdresserCpdMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Şifreler aynı olmalıdır!
                    </div>
                `;
            }
        }
    }

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day === 0 ? (
                <div className="alert alert-danger m-2" role="alert">
                    Abonelik süreniz dolduğu için bu sistemden faydalanamazsınız, lütfen abone olunuz!
                </div>
            ) : (
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Kuaför Bilgileri Güncelleme
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="salonName">Kuaför Adı</label>
                                        <input ref={inputName} type="text" class="form-control" id="salonName" defaultValue={hairdresserData.name} placeholder="Kuaför adı" />
                                    </div>
                                    <div class="form-group">
                                        <label for="address">Adres</label>
                                        <input ref={inputAddress} type="text" class="form-control" id="address" defaultValue={hairdresserData.address} placeholder="Kuaför adresi" />
                                    </div>
                                    <div class="form-group">
                                        <label for="email">E-mail</label>
                                        <input ref={inputMail} type="email" class="form-control" id="email" defaultValue={hairdresserData.email} placeholder="E-mail adresi" />
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Telefon Numarası</label>
                                        <input ref={inputPhone} type="tel" class="form-control" id="phone" defaultValue={hairdresserData.phone_number} placeholder="Telefon numarası" />
                                    </div>
                                    <div class="form-group">
                                        <label for="hidden-price">Kuaför Hizmetleri Fiyat Görünürlüğü</label>
                                        <select ref={inputHiddenPrice} className="form-control" id="hidden-price">
                                                <option value="0">Görünür</option>
                                                <option value="1">Gizli</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="image">Resimı</label>
                                        <input onChange={handleFileChange} type="file" class="form-control" name="image" id="image" accept="image/*" />
                                    </div>
                                    <div ref={hairdresserUpdateMessage}></div>
                                    <button onClick={btnUpdate} type="submit" class="btn btn-primary mt-2">Bilgileri Güncelle</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Şifre Değiştirme
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="newPassword">Yeni Şifre</label>
                                        <input ref={inputPassword} type="password" class="form-control" id="newPassword" placeholder="Yeni şifreniz" />
                                    </div>
                                    <div class="form-group">
                                        <label for="confirmPassword">Yeni Şifre Tekrar</label>
                                        <input ref={inputRePassword} type="password" class="form-control" id="confirmPassword" placeholder="Yeni şifrenizi tekrar girin" />
                                    </div>
                                    <div ref={hairdresserCpdMessage}></div>
                                    <button onClick={btnChangePassword} type="submit" class="btn btn-primary mt-2">Şifreyi Değiştir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default HairdresserSettings
