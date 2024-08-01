import { useState, useEffect } from "react";
import UserHeader from "./../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserServices.css";
import { useParams } from "react-router-dom";

function UserServices() {


    //https://via.placeholder.com/300
    //../../../../SERVER/uploads
    const { hairdresser_id } = useParams();
    const [userdata, setData] = useState([]);
    const [hiddenPrice, setHiddenPrice] = useState([]);
    const [serviceData, setServiceData] = useState([]);


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
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-get-service", {
            hairdresser_id
        })
            .then(response => {
                setServiceData(response.data)
            })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-get-hidden-price", {
            hairdresser_id
        })
            .then(response => {
                setHiddenPrice(response.data)
            })
    }, [])

    return (
        <>
            <UserHeader />
            {hiddenPrice.hidden_price == 0 ? (
                <div class="container mt-4">
                    <div class="row">
                        {serviceData.map(s => (
                            <div key={s.service_id} class="col-lg-3 col-md-6 mb-4">
                                {s.image == 'Yok' ? (
                                    <div class="card kuaför-kutusu">
                                        <div class="card-body">
                                            <h5 class="card-title">{s.service_name}</h5>
                                            <p class="card-text"><b>Açıklama :</b> {s.service_description}</p>
                                            <p class="card-text"><b>Fiyat :</b> {s.price} TL</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div class="card kuaför-kutusu">
                                        <img src={import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/" + s.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{s.service_name}</h5>
                                            <p class="card-text"><b>Açıklama :</b> {s.service_description}</p>
                                            <p class="card-text"><b>Fiyat :</b> {s.price} TL</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>
                </div >
            ) : (
                <div class="container mt-4">
                    <div class="row">
                        {serviceData.map(s => (
                            <div key={s.service_id} class="col-lg-3 col-md-6 mb-4">
                                {s.image == 'Yok' ? (
                                    <div class="card kuaför-kutusu">
                                        <div class="card-body">
                                            <h5 class="card-title">{s.service_name}</h5>
                                            <p class="card-text"><b>Açıklama :</b> {s.service_description}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div class="card kuaför-kutusu">
                                        <img src={import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/" + s.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{s.service_name}</h5>
                                            <p class="card-text"><b>Açıklama :</b> {s.service_description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>
                </div >
            )

            }
        </>
    )
}

export default UserServices
