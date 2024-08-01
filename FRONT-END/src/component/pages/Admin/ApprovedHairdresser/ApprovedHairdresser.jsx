import { useEffect, useState, useRef } from "react";
import AdminHeader from "../../../Header/AdminHeader/AdminHeader.jsx";
import "./ApprovedHairdresser.css"
import axios from "axios";

function ApprovedHairdresser() {

    const approvedMessage = useRef();

    function btnApproved(e) {
        const succes = confirm("Onaylamak istediğinize emin misinz?")
        if (succes) {
            const id = e.target.id;
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/approved-hairdresser", {
                id
            }).then(response => {
                if (response.data == "1") {
                    approvedMessage.current.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            Kuaför kaydı başarıyla onaylandı!
                        </div>
                    `;
                    let newArr = approvedList.filter(item => item.ApprovedHairdresser !== e.target.id);
                    setApprovedList(newArr)
                }
                else if (response.data=="1"){
                    approvedMessage.current.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Kuaför onayı başarısız oldu!
                    </div>
                `;
                }
            })
        }
    }

    const [approvedList, setApprovedList] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-check-approved").then(response => {
            setApprovedList(response.data)
        })
    }, [approvedList])

    return (
        <>
            <AdminHeader />
            <div class="container mt-4">
                <h2>Onay Bekleyen Kuaför Bilgileri</h2>
                <div ref={approvedMessage}></div>
                <table class="table table-bordered mt-3">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Kuaför Adı</th>
                            <th scope="col">Kuaför Adresi</th>
                            <th scope="col">Telefon Numarası</th>
                            <th scope="col">Onayla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedList.map(a => (
                            <tr key={a.hairdresser_id}>
                                <td>{a.name}</td>
                                <td>{a.address}</td>
                                <td>{a.phone_number}</td>
                                <td>
                                    <button onClick={btnApproved} id={a.hairdresser_id} class="btn approve-btn">Onayla</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ApprovedHairdresser
