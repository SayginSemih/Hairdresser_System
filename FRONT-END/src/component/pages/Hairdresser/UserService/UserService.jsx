import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./UserService.css";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import { useParams } from "react-router-dom";

function UserService() {

    const { uniquecode } = useParams();
    const [hairdresserData, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [price, setPrice] = useState(0);
    const [point, setPoint] = useState(0.00);
    const [uploadService, setUploadService] = useState(0);

    const inputSelect = useRef();
    const paymentMessage = useRef();

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                }
            })
        }
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/get-user", {
            unique_code: uniquecode
        }).then(response => {
            setUserData(response.data)
        })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/list-service", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            setServiceData(response.data);
            if (uploadService != 1) {
                setUploadService(1)
            }
        })

    }, [uploadService])

    function Add() {
        let totalPrice = 0;
        let totalPoint = 0;
        const newData = serviceData.filter(s => s.service_id == inputSelect.current.value)
        const updateBuyList = [...buyList, newData]
        setBuyList(updateBuyList)
        updateBuyList.forEach(e => {
            totalPrice = totalPrice + e[0].price
            totalPoint = (Number(totalPoint) + Number(e[0].point)).toFixed(2)
        });
        setPrice(totalPrice)
        setPoint(totalPoint)
    }

    function Remove(e) {
        let totalPrice = price
        let totalPoint = point
        const index = Number(e.target.id);
        const updatedList = [...buyList];
        totalPrice = totalPrice - updatedList[index][0].price
        totalPoint = totalPoint - updatedList[index][0].point
        updatedList.splice(index, 1);
        setBuyList(updatedList);
        setPrice(totalPrice)
        setPoint(totalPoint.toFixed(2))
    }

    function Earned() {
        if (price > 0 && point > 0) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/loyalty-earned", {
                user_id: userData.user_id,
                hairdresser_id: hairdresserData.hairdresser_id,
                points_earned: point,
                price
            }).then(response => {
                if (response.data == "1") {
                    paymentMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Ödeme tamamlandı, sadakat puanı başarıyla eklendi!
                        </div>
                    `;
                }
                else if (response.data == "2") {
                    paymentMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Ödeme esnasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function Redeemed() {
        if (price > 0 && point > 0) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/loyalty-redeemed", {
                user_id: userData.user_id,
                hairdresser_id: hairdresserData.hairdresser_id,
                price
            }).then(response => {
                if (response.data == "1") {
                    paymentMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Ödeme tamamlandı, sadakat puanı başarıyla kullanıldı!
                        </div>
                    `;
                }
                else if (response.data == "2") {
                    paymentMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Ödeme esnasında bir hata meydana geldi!
                        </div>
                    `;
                }
                else if (response.data == "3") {
                    paymentMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Kullanıcının yeterli sadakat puanı bulunmamaktadır!
                        </div>
                    `;
                }
            })
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
                <>
                    <div class="container mt-5">
                        <div class="card">
                            <div class="card-header">
                                Kullanıcı Bilgileri
                            </div>
                            <div class="card-body">
                                <div class="form-group row">
                                    <label for="name" class="col-sm-3 col-form-label">Ad Soyad</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control-plaintext" id="name" value={userData.name + " " + userData.surname} readonly />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="email" class="col-sm-3 col-form-label">E-mail</label>
                                    <div class="col-sm-9">
                                        <input type="email" class="form-control-plaintext" id="email" value={userData.email} readonly />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone" class="col-sm-3 col-form-label">Telefon</label>
                                    <div class="col-sm-9">
                                        <input type="tel" class="form-control-plaintext" id="phone" value={userData.phone_number} readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h1>Kuaför Hizmetleri Seçimi</h1>

                        <div class="form-group">
                            <label for="serviceSelect">Hizmet Seç:</label>
                            <select ref={inputSelect} class="form-control" id="serviceSelect">
                                {serviceData.map(s => (
                                    <option value={s.service_id}>{s.service_name}</option>
                                ))}
                            </select>
                            <button onClick={Add} class="btn btn-primary mt-2" id="addServiceBtn">Ekle</button>
                        </div>

                        <table class="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Hizmet Adı</th>
                                    <th scope="col">Fiyatı</th>
                                    <th scope="col">Sadakat Puanı %</th>
                                    <th scope="col">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody id="serviceTableBody">
                                {buyList.map((b, index) => (
                                    <tr key={b[0].service_id}>
                                        <td>{b[0].service_name}</td>
                                        <td>{b[0].price} TL</td>
                                        <td>{b[0].point}</td>
                                        <td><button onClick={Remove} id={index} className="btn btn-danger">Sil</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div class="form-group">
                            <div ref={paymentMessage}></div>
                            <label for="serviceSelect"><b>Toplam Tutar :</b> {price} TL</label><br />
                            <label for="serviceSelect"><b>Kazanılan Sadakat Puanı :</b> {point}</label><br />
                            <button onClick={Earned} className="btn btn-success m-1">Öde</button>
                            <button onClick={Redeemed} className="btn btn-success">Puan İle Öde</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UserService
