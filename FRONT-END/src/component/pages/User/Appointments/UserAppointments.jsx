import { useEffect, useRef, useState } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserAppointments() {

    const { hairdresser_id } = useParams(); // KUAFÖR ID

    const [userdata, setData] = useState([]); // KULLANICI VERİLERİ
    const [serviceData, setServiceData] = useState([]); // KUAFÖRÜN HİZMETLERİNİN TUTULDUĞU DATA
    const [avaliableApponintments, setAvaliableAppointments] = useState([]); // AKTİF RANDEVULARIN TUTULDUĞU DATA
    const [databaseStaff, setDatabaseStaff] = useState([]); // PERSONELLERİN TUTULDUĞU DATA
    const [getMyAppointments, setMyAppointments] = useState([]); // KULLANICININ ALMIŞ OLDUĞU AKTİF RANDEVULARIN TUTULDUĞU DATA
    const [myAppointmentsLoad, setMyAppointmentsLoad] = useState(0); // SAYFA YÜKLENDİĞİNDE setMyAppointments() FONKSİYONUNUN DÜZGÜN ÇALIŞMASI İÇİN KONTROL STATESİ
    const [uploadStaff, setUploadStaff] = useState(0); // SAYFA YÜKLENDİĞİNDE setDatabaseStaff() FONKSİYONUNUN DÜZGÜN ÇALIŞMASI İÇİN KONTROL STATESİ
    const [uploadService, setUploadService] = useState(0); // SAYFA YÜKLENDİĞİNDE setServiceData() FONKSİYONUNUN DÜZGÜN ÇALIŞMASI İÇİN KONTROL STATESİ
    const [isAppointments, setAppointments] = useState(false); // KULLANICININ AKTİF RANDEVUSU VAR MI KONTROLÜ
    const [onUpdate, setUpdate] = useState(0); // KULLANICI RANDEVU ALDIĞINDA SAYFANIN TEKRAR RENDER EDİLMESİNİ SAĞLAR

    const inputStaff = useRef();
    const inputTime = useRef();
    const inputDate = useRef();
    const inputService = useRef();
    const appointmentMessage = useRef();
    const removeAppointmentMessage = useRef();
    const tableResponsive = useRef();

    // SAYFA RENDERLENDIĞINDA
    useEffect(() => {
        // KULLANICI GİRİŞ YAPTI MI KONTROLÜ
        if (localStorage.getItem("userToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-user", {
                token: localStorage.getItem("userToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                }
            })
        }

        // KULLANICININ ALABİLECEĞİ RANDEVULARI GETİRİR
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-get-avaliable-apponitments", {
            hairdresser_id
        }).then(response => {
            setAvaliableAppointments(response.data)
            if (uploadStaff != 1) {
                setUploadStaff(uploadStaff + 1)
            }
            onChangeStaff();
            onChangeTime();
        })

        // KULLANICININ ALDIĞI RANDEVULARI GETİRİR
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-active-apponitments", {
            user_id: userdata.user_id,
            hairdresser_id
        }).then(response => {
            if (response.data == "2") {
                setAppointments(false);
            } else {
                setAppointments(true);
                setMyAppointments(response.data)
                if (myAppointmentsLoad != 1) {
                    setMyAppointmentsLoad(myAppointmentsLoad + 1)
                }
            }
        })

        // PERSONELLERİ GETİRİR
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/get-staff", {
            hairdresser_id
        }).then(response => {
            setDatabaseStaff(response.data)
        })
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/list-staff-service", {
            hairdresser_id
        }).then(response => {
            setServiceData(response.data);
            if (uploadService != 1) {
                setUploadService(uploadService + 1)
            }
        })

    }, [uploadStaff, myAppointmentsLoad, onUpdate, uploadService])

    // KULLANICI RANDEVU AL BUTONUNA BASTIĞINDA ÇALIŞIR
    function btnSubmit(e) {
        function isInput(id) {
            const inp = e.target.parentElement.parentElement.children[id].children[0].value
            return inp
        }
        const staffID = isInput(0);
        const appointments_time = isInput(1);
        const appointments_date = isInput(2);
        const appointments_service = isInput(3);
        if (!staffID || !appointments_time || !appointments_date || !appointments_service) {
            appointmentMessage.current.innerHTML = `
            <div class="alert alert-warning mt-2" role="alert">
                Lütfen tüm alanları doldurunuz!
            </div>
        `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-create-apponitments", {
                user_id: userdata.user_id,
                hairdresser_id,
                staff_id: staffID,
                appointment_date: appointments_date,
                appointment_time: appointments_time,
                service_details: appointments_service
            }).then(response => {
                if (response.data == "1") {
                    appointmentMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Randevunuz başarıyla alındı!
                        </div>
                    `;
                    setUpdate(onUpdate + 1)
                }
                else if (response.data == "2") {
                    appointmentMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Randevu alma işlemi esnasında bir hata meydana geldi!
                        </div>
                    `;
                }
                else if (response.data == "3") {
                    appointmentMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Bu randevu daha önceden alınmış!
                        </div>
                    `;
                }
            })
        }
    }

    // KULLANICI RANDEVU İPTAL ET BUTONUNA BASTIĞINDA BURASI ÇALIŞIR
    function btnCancel(e) {
        const success = confirm("Randevunuzu iptal etmek istediğinizden emin misiniz?");
        if (success) {
            function isInput(id) {
                const inp = e.target.parentElement.parentElement.children[id].innerHTML
                return inp
            }
            const staffID = e.target.parentElement.parentElement.children[0].id;
            const appointments_time = isInput(1);
            const appointments_date = isInput(2);
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-cancel-apponitments", {
                appointment_id: e.target.id,
                user_id: userdata.user_id,
                hairdresser_id,
                staff_id: staffID,
                appointment_date: appointments_date,
                appointment_time: appointments_time
            }).then(response => {
                if (response.data == "1") {
                    removeAppointmentMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Randevunuz başarıyla iptal edildi!
                    </div>
                `;
                    const newData = getMyAppointments.filter(g => g.appointment_id != e.target.id)
                    setMyAppointments(newData)
                }
                else if (response.data == "2") {
                    removeAppointmentMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Randevunuzun iptali esnasında bir hata meydana geldi!
                    </div>
                `;
                }
                else if (response.data == "3") {
                    removeAppointmentMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Randevunuz bugün olduğu için iptal edemezsiniz!
                    </div>
                `;
                }
            })
        }
    }

    // KULLANICI RANDEVU BÖLÜMÜNDE PERSONEL DEĞİŞTİRDİĞİNDE BURASI TETİKLENİR
    function onChangeStaff(e) {
        inputTime.current.innerHTML = "";
        const selectedStaff = inputStaff.current.value;
        const data = avaliableApponintments.filter(f => f.staff_id == selectedStaff)
        // Benzersiz saatleri tutmak için bir Set kullanıyoruz
        const uniqueTimes = new Set(data.map(d => d.appointment_time));
        // Set'i diziye dönüştürüyoruz ve HTML içeriğine ekliyoruz
        Array.from(uniqueTimes).map(time => {
            inputTime.current.innerHTML += `
            <option>${time}</option>
        `;
        });
        onChangeTime();
    }

    // KULLANICI RANDEVU BÖLÜMÜNDE SAATİ DEĞİŞTİRİNCE BURASI TETİKLENİR
    function onChangeTime() {
        inputDate.current.innerHTML = "";
        const selectedTime = inputTime.current.value;
        const data = avaliableApponintments.filter(f => (f.staff_id == inputStaff.current.value) && (f.appointment_time == selectedTime))
        data.map(d => {
            inputDate.current.innerHTML += `
                <option>${formatDate(d.appointment_date)}</option>
            `;
        })
        const newData = serviceData.filter(s => s.staff_id == inputStaff.current.value)
        inputService.current.innerHTML=``;
        newData.forEach(nd => {
            inputService.current.innerHTML+=`<option>${nd.service}</option>`;
        })
    }

    // DATABASEDEN ÇEKİLEN TARİHİ JAVASCRIPT FORMATINA UYARLAR
    function formatDate(date1) {
        const d = new Date(date1)
        return d.getFullYear() + '-' +
            (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' +
            (d.getDate() < 10 ? '0' : '') + d.getDate();
    }

    return (
        <>
            <UserHeader />
            <div className="container mt-4">
                <h2 className="mb-4">Aktif Randevuların</h2>

                <div ref={removeAppointmentMessage}></div>

                <div ref={tableResponsive} className="table-responsive">
                    {isAppointments == false ? (
                        <p>Aktif randevun yok</p>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Personel</th>
                                    <th>Saat</th>
                                    <th>Tarih</th>
                                    <th>Hizmet</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getMyAppointments.map(mp => (
                                    <tr key={mp.appointment_id}>
                                        <td id={mp.staff_id}>{mp.name + " " + mp.surname}</td>
                                        <td>{mp.appointment_time}</td>
                                        <td>{formatDate(mp.appointment_date)}</td>
                                        <td>{mp.service_details}</td>
                                        <td>
                                            <button onClick={btnCancel} id={mp.appointment_id} className="btn btn-danger btn-sm m-1">İptal Et</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <hr />
            <div className="container mt-4">
                <h2 className="mb-4">Müsait Randevu Listesi Seçme Alanı</h2>

                <div ref={appointmentMessage} ></div>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Personel</th>
                                <th>Saat</th>
                                <th>Tarih</th>
                                <th>Hizmet</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select ref={inputStaff} onChange={onChangeStaff} class="form-control" id="name">
                                        {databaseStaff.map(a => (
                                            <option value={a.staff_id}>{a.name + " " + a.surname}</option>
                                        ))}

                                    </select>
                                </td>
                                <td>
                                    <select ref={inputTime} onChange={onChangeTime} class="form-control" id="time"></select>
                                </td>
                                <td>
                                    <select ref={inputDate} class="form-control" id="date"></select>
                                </td>
                                <td>
                                    <select ref={inputService} class="form-control" id="date">
                                    </select>
                                </td>
                                <td>
                                    <button onClick={btnSubmit} className="btn btn-success btn-sm m-1">Randevu Al</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserAppointments
