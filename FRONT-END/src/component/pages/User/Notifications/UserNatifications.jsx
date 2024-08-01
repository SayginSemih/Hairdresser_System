import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserNatifications.css";

function UserNatifications() {

    const [userdata, setData] = useState([]);
    const [notifications, setNotifications] = useState([]);
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

            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/get-notifications", {
                user_id: userdata.user_id
            })
                .then(response => {
                    if (response.data != "2") {
                        setNotifications(response.data)
                        if (userLoad != 1) {
                            setUserLoad(1);
                        }
                    }
                })
        }
    }, [userLoad])

    function formatDate(date) {
        var starttime = new Date(date);
        var isotime = new Date((new Date(starttime)).toISOString());
        var fixedtime = new Date(isotime.getTime() - (starttime.getTimezoneOffset() * 60000));
        var formatedMysqlString = fixedtime.toISOString().slice(0, 19).replace('T', ' ');
        return formatedMysqlString
    }

    function Go(e) {
        window.location.href = "/user/hairdressers/" + e.target.id;
    }

    return (
        <>
            <UserHeader />
            <div class="container mt-5">
                <h2 class="mb-4">Bildirimler</h2>
                {notifications.map(n => (
                    <div class="card mt-2">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body">
                                    <h5 class="mt-0">{n.title}</h5>
                                    <p>{n.message}</p>
                                    <small class="text-muted">{formatDate(n.created_at)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserNatifications
