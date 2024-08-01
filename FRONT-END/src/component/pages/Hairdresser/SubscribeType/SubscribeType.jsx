import { useEffect, useState, useRef } from "react";
import axios from "axios";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import "./SubscribeType.css"

function SubscribeType() {

    const [hairdresserData, setData] = useState([]);

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
    }, [])

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day == 0 ? (
                <div class="subscription-status" style={{ color: "red" }}>
                    Abonelik süreniz sona erdi
                </div>
            ) : (
                <div class="subscription-status" style={{ color: "green" }}>
                    Kalan abonelik süreniz: {hairdresserData.sub_day} Gün
                </div>
            )}
            <div class="container mt-5">
                <h2 class="text-center mb-4">Abonelik Seçenekleri</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card subscription-card">
                            <div class="card-header-subscribe">
                                1 Aylık Abonelik
                            </div>
                            <div class="card-body-subscribe">
                                <p class="price">{import.meta.env.VITE_REACT_APP_SUB1PRICE} TL</p>
                                <p>1 ay geçerli, kuaförünüzü kullanıma açın.</p>
                                <a href="/hairdresser/sub-1-payment" class="btn btn-primary btn-subscribe m-1">Abone Ol</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card subscription-card">
                            <div class="card-header-subscribe">
                                1 Yıllık Abonelik
                            </div>
                            <div class="card-body-subscribe">
                                <p class="price">{import.meta.env.VITE_REACT_APP_SUB2PRICE} TL</p>
                                <p>1 yıl geçerli, kuaförünüzü kullanıma açın.</p>
                                <a href="/hairdresser/sub-2-payment" class="btn btn-primary btn-subscribe m-1">Abone Ol</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubscribeType
