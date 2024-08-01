import { useState, useEffect } from "react";
import AdminHeader from "../../Header/AdminHeader/AdminHeader.jsx";
import axios from "axios";

function AdminPage() {

    const [approvedCountList, setApprovedList] = useState([]);
    const [userCountList, setUserList] = useState([]);
    const [hairdresserCountList, setHairdresserList] = useState([]);
    const [subscribersCountList, setsubscribersCountList] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/approved-count").then(response => {
            setApprovedList(response.data)
        })

        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/users-count").then(response => {
            setUserList(response.data)
        })

        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdressers-count").then(response => {
            setHairdresserList(response.data)
        })

        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/subscribers-count").then(response => {
            setsubscribersCountList(response.data)
        })
    }, [])

    return (
        <>
            <AdminHeader />
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mt-2">
                        <div class="card">
                            <div class="card-header">
                                <i class="fas fa-users"></i> Aktif Kullanıcı Sayısı
                            </div>
                            <div class="card-body">
                                <h1>{userCountList.count}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card">
                            <div class="card-header">
                                <i class="fas fa-cut"></i> Aktif Kuaför Sayısı
                            </div>
                            <div class="card-body">
                                <h1>{hairdresserCountList.count}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card">
                            <div class="card-header">
                                <i class="fas fa-cut"></i> Aktif Abone Sayısı
                            </div>
                            <div class="card-body">
                                <h1>{subscribersCountList.count}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card">
                            <div class="card-header">
                                <i class="fas fa-cut"></i> Onay Bekleyen Kuaför Sayısı
                            </div>
                            <div class="card-body">
                                <h1>{approvedCountList.count}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage
