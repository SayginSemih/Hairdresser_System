import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminHeader from "../../../Header/AdminHeader/AdminHeader.jsx";

function SubscribeDetails() {

    const [subscribeDetails, setSubscribeDetails] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-subscribe-details").then(response => {
            setSubscribeDetails(response.data)
        })
    }, [])

    return (
        <>
            <AdminHeader />
            <div class="container mt-4">
                <h2>Abonelik Detayları</h2>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Kuaför Adı</th>
                            <th scope="col">Telefon Numarası</th>
                            <th scope="col">Abonelik Türü</th>
                            <th scope="col">Sipariş Numarası</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribeDetails.map(sd => (
                            <tr>
                                <td>{sd.name}</td>
                                <td>{sd.phone_number}</td>
                                <td>{sd.type}</td>
                                <td>{sd.merchant_oid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default SubscribeDetails
