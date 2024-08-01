import { useEffect, useRef, useState } from "react";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

function AppointmentList() {

    const [hairdresserData, setHairdresserData] = useState([]);
    const [hairdresserLoad, setHairdresserLoad] = useState(0);
    const [appointmentsData, setAppointmentsData] = useState([]);

    // DATABASEDEN ÇEKİLEN TARİHİ JAVASCRIPT FORMATINA UYARLAR
    function formatDate(date1) {
        const d = new Date(date1)
        return d.getFullYear() + '-' +
            (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' +
            (d.getDate() < 10 ? '0' : '') + d.getDate();
    }

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setHairdresserData(response.data.userdata.data)
                }
                if (hairdresserLoad != 1) {
                    setHairdresserLoad(hairdresserLoad + 1)
                }
            })
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/user/get-appointments", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            if (response.data != "2") {
                setAppointmentsData(response.data)
            }
        })

    }, [hairdresserLoad])

    function Close(e) {
        const success = confirm("Randevuyu kapatmak istediğinize emin misiniz?");
        if (success) {
            const staff_id = e.target.parentElement.parentElement.children[1].id;
            const appointment_time = e.target.parentElement.parentElement.children[2].innerHTML;
            const appointment_date = e.target.parentElement.parentElement.children[3].innerHTML;
            const hairdresser_id = hairdresserData.hairdresser_id
            const appointment_id = e.target.id
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/user/close-appointments", {
                staff_id,
                appointment_time,
                appointment_date,
                hairdresser_id,
                appointment_id
            }).then(response => {
                if (response.data == "1") {
                    alert("Randevu başarıyla kapatildi")
                } else if (response.data == "2") {
                    alert("Bir hata meydana geldi!'")
                }
            })
        }
    }

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day == 0 ? (
                <div class="alert alert-danger m-2" role="alert">
                    Abonelik süreniz dolduğu için bu sistemden faydalanamazsınız, lütfen abone olunuz!
                </div>
            ) : (
                <div className="container mt-4">
                    <h2 className="mb-4">Aktif Müşteri Randevuları</h2>

                    <div></div>

                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Müşteri</th>
                                    <th>Personel</th>
                                    <th>Saat</th>
                                    <th>Tarih</th>
                                    <th>Hizmet</th>
                                    <th>Telefon</th>
                                    <th>Mail</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentsData.map(a => (
                                    <tr key={a.appointment_id}>
                                        <td id={a.user_id}>{a.uname + " " + a.usurname}</td>
                                        <td id={a.staff_id}>{a.sname + " " + a.ssurname}</td>
                                        <td>{a.appointment_time}</td>
                                        <td>{formatDate(a.appointment_date)}</td>
                                        <td>{a.service_details}</td>
                                        <td>{a.phone_number}</td>
                                        <td>{a.email}</td>
                                        <td><button onClick={Close} id={a.appointment_id} className="btn btn-success">Kapat</button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default AppointmentList
