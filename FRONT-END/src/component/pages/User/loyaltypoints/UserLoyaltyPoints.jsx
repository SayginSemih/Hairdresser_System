import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserLoyaltyPoints.css";

function UserLoyaltyPoints() {

    const [userdata, setData] = useState([]);
    const [loyaltyPoints, setLoyaltyPoints] = useState([]);
    const [userLoad, setUserLoad] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-user", {
                token: localStorage.getItem("userToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                }
            })

            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/get-loyaltypoints", {
                user_id: userdata.user_id
            })
                .then(response => {
                    if (response.data != "2") {
                        setLoyaltyPoints(response.data)
                        if (userLoad != 1)
                        {
                            setUserLoad(1);
                        }
                    }
                })
        }
    }, [userLoad])

    function Go(e) {
        window.location.href="/user/hairdressers/" + e.target.id;
    }

    return (
        <>
            <UserHeader />
            <div class="container mt-4">
                <h2>Sadakat Puanları</h2>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Kuaför Adı</th>
                            <th scope="col">Telefon Numarası</th>
                            <th scope="col">Sadakat Puanı</th>
                            <th scope="col">Kullanılan Sadakat Puanı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loyaltyPoints.map(l => (
                            <tr onClick={Go} style={{ cursor: "pointer;"}}>
                                <td id={l.hairdresser_id}>{l.name}</td>
                                <td id={l.hairdresser_id}>{l.phone_number}</td>
                                <td id={l.hairdresser_id}>{l.points_earned}</td>
                                <td id={l.hairdresser_id}>{l.points_redeemed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default UserLoyaltyPoints
