import { useEffect, useRef, useState } from "react";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import axios from "axios";

function HairdresserSettings() {

    const [hairdresserData, setHairdresserData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [staffLoad, setStaffLoad] = useState(0);
    const [apoointmentsLoad, setAppointmentsLoad] = useState(0);
    const [apoointmentsRemove, setAppointmentsRemove] = useState(0);
    const [apoointmentsAdd, setAppointmentsAdd] = useState(0);
    // HAFTALIK VE AYLIK EKLEMELER YAPMAK İÇİN
    const [holidayData, setHolidayData] = useState([
        {
            "id": 1,
            "date": "Monday",
            "name": "Pazartesi"
        },
        {
            "id": 2,
            "date": "Tuesday",
            "name": "Salı"
        },
        {
            "id": 3,
            "date": "Wednesday",
            "name": "Çarşamba"
        },
        {
            "id": 4,
            "date": "Thursday",
            "name": "Perşembe"
        },
        {
            "id": 5,
            "date": "Friday",
            "name": "Cuma"
        },
        {
            "id": 6,
            "date": "Saturday",
            "name": "Cumartesi"
        },
        {
            "id": 7,
            "date": "Sunday",
            "name": "Pazar"
        }
    ]
    );
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [holiday, setHoliday] = useState('');
    const holidayRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const createWeeklyAppointmentsMessage = useRef();

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setHairdresserData(response.data.userdata.data)
                }
            })
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/get-staff", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            if (staffLoad != 1) {
                setStaffLoad(1)
            }
            setStaffData(response.data)
        })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/list-appointments", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            if (apoointmentsLoad != 1) {
                setAppointmentsLoad(1)
            }
            setAppointmentsData(response.data)
        })

    }, [staffLoad, apoointmentsRemove, apoointmentsAdd])

    const inputName = useRef();
    const inputTime = useRef();
    const inputDate = useRef();
    const createAppintmentsMessage = useRef();
    const removeAppointmentsMessage = useRef();

    function addAppointments() {
        const staffID = inputName.current.value;
        const staffTime = inputTime.current.value;
        const staffDate = inputDate.current.value;
        if (!staffID || !staffTime || !staffDate) {
            createAppintmentsMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/create-appointments", {
                hairdresser_id: hairdresserData.hairdresser_id,
                staff_id: staffID,
                appointment_date: staffDate,
                appointment_time: staffTime
            }).then(response => {
                if (response.data == "1") {
                    createAppintmentsMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Randevu oluşturma işlemi başarılı!
                        </div>
                    `;
                    setAppointmentsAdd(apoointmentsAdd + 1)
                }
                else if (response.data == "2") {
                    createAppintmentsMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Randevu oluşturma işlemi esnasında bir hata meydana geldi!
                        </div>
                    `;
                }
                else if (response.data == "3") {
                    createAppintmentsMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Bu saat ve tarihe ayarlı bir randevu zaten oluşturulmuş!
                        </div>
                    `;
                }
            })
        }
    }

    function removeAppointments(e) {
        const appointment_id = e.target.id;
        const success = confirm("Silmek istediğinize emin misiniz?");
        if (success) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/remove-appointments", {
                appointment_id,
                hairdresser_id: hairdresserData.hairdresser_id,
            }).then(response => {
                if (response.data == "1") {
                    removeAppointmentsMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Randevu tarihi silme işlemi başarılı!
                    </div>
                `;
                    const newData = appointmentsData.filter(s => s.appointment_id != e.target.id)
                    console.log(newData)
                    setAppointmentsData(newData)
                    apoointmentsRemove(apoointmentsRemove + 1)
                } else if (response.data == "2") {
                    removeAppointmentsMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Randevu tarihi silme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function createWeeklyAppointments() {
        const staffID = inputName.current.value;
        const holiday = holidayRef.current.value;
        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;

        if (!staffID || !holiday || !startTime || !endTime) {
            createWeeklyAppointmentsMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
            return;
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/create-weekly-appointments", {
            hairdresser_id: hairdresserData.hairdresser_id,
            staff_id: staffID,
            holiday,
            start_time: startTime,
            end_time: endTime
        }).then(response => {
            if (response.data == "1") {
                createWeeklyAppointmentsMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Haftalık randevular başarıyla oluşturuldu!
                    </div>
                `;
                setAppointmentsAdd(apoointmentsAdd + 1)
            } else {
                createWeeklyAppointmentsMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Randevu oluşturulurken bir hata meydana geldi!
                    </div>
                `;
            }
        });
    }

    function createMonthlyAppointments() {
        const staffID = inputName.current.value;
        const holiday = holidayRef.current.value;
        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;

        if (!staffID || !holiday || !startTime || !endTime) {
            createWeeklyAppointmentsMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
            return;
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/create-monthly-appointments", {
            hairdresser_id: hairdresserData.hairdresser_id,
            staff_id: staffID,
            holiday,
            start_time: startTime,
            end_time: endTime
        }).then(response => {
            if (response.data == "1") {
                createWeeklyAppointmentsMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Aylık randevular başarıyla oluşturuldu!
                    </div>
                `;
                setAppointmentsAdd(apoointmentsAdd + 1)
            } else {
                createWeeklyAppointmentsMessage.current.innerHTML = `
                    <div class="alert alert-danger mt-2" role="alert">
                        Randevu oluşturulurken bir hata meydana geldi!
                    </div>
                `;
            }
        });
    }

    function formatDate(date1) {
        const d = new Date(date1)
        return d.getFullYear() + '-' +
            (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' +
            (d.getDate() < 10 ? '0' : '') + d.getDate();
    }

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day === 0 ? (
                <div className="alert alert-danger m-2" role="alert">
                    Abonelik süreniz dolduğu için bu sistemden faydalanamazsınız, lütfen abone olunuz!
                </div>
            ) : (<>
                <div className="container mt-5">
                    <div className="form-group">
                        <label htmlFor="isimler">Personel İsmi Seçin:</label>
                        <select ref={inputName} className="form-control" id="isimler">
                            {staffData.map(h => (
                                <option key={h.staff_id} value={h.staff_id}>
                                    {`${h.name.toUpperCase()} ${h.surname.toUpperCase()}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br />
                    <b>İstediğin Tarihe Oluştur:</b>
                    <div className="form-group">
                        <div ref={createAppintmentsMessage}></div>
                        <label htmlFor="saat">Saat Seçin:</label>
                        <input ref={inputTime} type="time" className="form-control" id="saat" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tarih">Tarih Seçin:</label>
                        <input ref={inputDate} type="date" className="form-control" id="tarih" />
                    </div>
                    <button onClick={addAppointments} type="button" className="btn btn-primary mt-2">Oluştur</button>
                </div>

                <div className="container mt-5">
                    <br />
                    <b>Haftalık veya Aylık Otomatik Oluşturma:</b>
                    <div className="form-group">
                        <div ref={createWeeklyAppointmentsMessage}></div>
                        <label htmlFor="holiday">İzin Gününü Seçin:</label>
                        <select ref={holidayRef} className="form-control" id="holiday">
                            {holidayData.map(h => (
                                <option key={h.id} value={h.date}>
                                    {h.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startTime">Çalışma Saati Başlangıcı:</label>
                        <input ref={startTimeRef} type="time" className="form-control" id="startTime" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">Çalışma Saati Bitişi:</label>
                        <input ref={endTimeRef} type="time" className="form-control" id="endTime" />
                    </div>
                    <button onClick={createWeeklyAppointments} type="button" className="btn btn-primary mt-2 m-1">Haftalık Randevu Oluştur</button>
                    <button onClick={createMonthlyAppointments} type="button" className="btn btn-primary mt-2 m-1">Aylık Randevu Oluştur</button>
                </div>

                <div className="container mt-4">
                    <h2 className="mb-4">Randevu Saatleri Listesi</h2>

                    <div className="table-responsive">
                        <div ref={removeAppointmentsMessage}></div>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Ad Soyad</th>
                                    <th>Saat</th>
                                    <th>Tarih</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentsData.map(a => ( 
                                    <tr key={a.appointment_id}>
                                        <td><input type="text" value={`${a.name} ${a.surname}`} className="form-control" readOnly /></td>
                                        <td><input type="time" value={a.appointment_time} className="form-control" readOnly /></td>
                                        <td><input type="date" value={formatDate(a.appointment_date)} className="form-control" readOnly /></td>
                                        <td>
                                            <button onClick={removeAppointments} id={a.appointment_id} className="btn btn-danger m-1">Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            )}
        </>
    )
}

export default HairdresserSettings
