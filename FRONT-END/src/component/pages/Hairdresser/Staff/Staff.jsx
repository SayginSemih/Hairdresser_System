import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Staff.css";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";

function Staff() {

    const [hairdresserData, setData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [staffServiceData, setStaffServiceData] = useState([]);
    const [uploadStaff, setUploadStaff] = useState(0);
    const [removeStaff, setRemoveStaff] = useState(0);
    const [addStaff, setAddStaff] = useState(0);
    const inputName = useRef();
    const inputSurname = useRef();
    const inputStaffName = useRef();
    const inputServiceName = useRef();
    const staffMessage = useRef();
    const staffServiceMessage = useRef();

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                    if (uploadStaff != 1)
                        setUploadStaff(1)
                }
            })
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/check-staff", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            setStaffData(response.data);
        })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/list-staff-service", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            setStaffServiceData(response.data);
        })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/list-service", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            setServiceData(response.data);
        })


    }, [uploadStaff, removeStaff, addStaff])

    function Add() {
        const staffName = inputName.current.value;
        const staffSurname = inputSurname.current.value;

        if (!staffName || !staffSurname) {
            staffMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/add-staff", {
                staffName,
                staffSurname,
                hairdresser_id: hairdresserData.hairdresser_id
            }).then(response => {
                if (response.data == "1") {
                    staffMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Personel kayıt işlemi başarılı!
                        </div>
                    `;
                    setAddStaff(addStaff + 1)
                }
                else if (response.data == "2") {
                    staffMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personel kayıt işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function Update(e) {

        function isInput(id) {
            const inp = e.target.parentElement.parentElement.children[id].children[0].value
            return inp
        }
        const staff_id = e.target.id;
        const staffName = isInput(0);
        const staffSurname = isInput(1);
        if (!staffName || !staffSurname) {
            staffMessage.current.innerHTML = `
            <div class="alert alert-warning mt-2" role="alert">
                Lütfen tüm alanları doldurunuz!
            </div>
        `;
        } else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/update-staff", {
                staff_id,
                hairdresser_id: hairdresserData.hairdresser_id,
                name: staffName,
                surname: staffSurname
            }).then(response => {
                if (response.data == "1") {
                    staffMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Personel güncelleme işlemi başarılı!
                    </div>
                `;
                } else if (response.data == "2") {
                    staffMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personel güncelleme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function Remove(e) {
        const staff_id = e.target.id;
        const success = confirm("Silmek istediğinize emin misiniz?");
        if (success) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/remove-staff", {
                staff_id,
                hairdresser_id: hairdresserData.hairdresser_id,
            }).then(response => {
                if (response.data == "1") {
                    staffMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Personel silme işlemi başarılı!
                    </div>
                `;
                    const newData = staffData.filter(s => s.staff_id !== e.target.id)
                    setStaffData(newData)
                    setRemoveStaff(removeStaff + 1)
                } else if (response.data == "2") {
                    staffMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personel silme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function addStaffService() {
        const staff_id = inputStaffName.current.value;
        const staffService = inputServiceName.current.value;

        if (!staff_id || !staffService) {
            staffServiceMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Lütfen tüm alanları doldurunuz!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/add-staff-service", {
                staff_id,
                staffService,
                hairdresser_id: hairdresserData.hairdresser_id
            }).then(response => {
                if (response.data == "1") {
                    staffServiceMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Personele servis ekleme işlemi başarılı!
                        </div>
                    `;
                    setAddStaff(addStaff + 1)
                }
                else if (response.data == "2") {
                    staffServiceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personele servis ekleme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
                else if (response.data == "3") {
                    staffServiceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Bu servis zaten bu personele daha önceden eklenmiş!
                        </div>
                    `;
                }
            })
        }
    }

    function removeStaffService(e) {
        const service_id = e.target.id;
        const success = confirm("Silmek istediğinize emin misiniz?");
        if (success) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/staff/remove-staff-service", {
                service_id,
                hairdresser_id: hairdresserData.hairdresser_id,
            }).then(response => {
                if (response.data == "1") {
                    staffServiceMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Personel hizmeti silme işlemi başarılı!
                    </div>
                `;
                    const newData = staffServiceData.filter(s => s.staff_service_id !== e.target.id)
                    setStaffServiceData(newData)
                    setRemoveStaff(removeStaff + 1)
                } else if (response.data == "2") {
                    staffServiceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personel hizmeti silme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day === 0 ? (
                <div className="alert alert-danger m-2" role="alert">
                    Abonelik süreniz dolduğu için bu sistemden faydalanamazsınız, lütfen abone olunuz!
                </div>
            ) : (
                <>
                    <div className="container mt-4">
                        <div ref={staffMessage}></div>
                        <h2>Personel Ekle</h2>

                        <div className="row">
                            <div className="col">
                                <input
                                    ref={inputName}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ad"
                                    name="firstName"
                                />
                            </div>
                            <div className="col">
                                <input
                                    ref={inputSurname}
                                    type="text"
                                    className="form-control"
                                    placeholder="Soyad"
                                    name="lastName"
                                />
                            </div>
                            <div className="col-auto">
                                <button onClick={Add} type="button" className="btn btn-primary">
                                    Ekle
                                </button>
                            </div>
                        </div>

                        <div className="container mt-4">
                            <h2 className="mb-4">Personel Listesi</h2>

                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Ad</th>
                                            <th>Soyad</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffData.map(s => (
                                            <tr key={s.staff_id}>
                                                <td><input type="text" className="form-control" defaultValue={s.name} /></td>
                                                <td><input type="text" className="form-control" defaultValue={s.surname} /></td>
                                                <td>
                                                    <button id={s.staff_id} onClick={Update} className="btn btn-warning btn-sm m-1">Güncelle</button>
                                                    <button id={s.staff_id} onClick={Remove} className="btn btn-danger btn-sm m-1">Sil</button>
                                                </td>
                                            </tr>
                                        ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="container mt-4">
                        <div ref={staffServiceMessage}></div>
                        <h2>Personele Pozisyon Ekle</h2>

                        <div className="row">
                            <select ref={inputStaffName} className="form-control m-1" id="staff-name">
                                {staffData.map(s => (
                                    <>
                                        <option value={s.staff_id}>{s.name} {s.surname}</option>
                                    </>
                                ))}
                            </select>
                            <select ref={inputServiceName} className="form-control m-1" id="staff-service-name">
                                {serviceData.map(s => (
                                    <>
                                        <option>{s.service_name}</option>
                                    </>
                                ))}
                            </select>
                            <div className="col-auto">
                                <button onClick={addStaffService} type="button" className="btn btn-primary">
                                    Ekle
                                </button>
                            </div>
                        </div>

                        <div className="container mt-4">
                            <h2 className="mb-4">Personel Pozisyonları Listesi</h2>

                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Personel Adı</th>
                                            <th>Verdiği Hizmetler</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffServiceData.map(s => (
                                            <tr key={s.staff_service_id}>
                                                <td><input type="text" className="form-control" defaultValue={s.name + " " + s.surname} /></td>
                                                <td><input type="text" className="form-control" defaultValue={s.service} /></td>
                                                <td>
                                                    <button id={s.staff_service_id} onClick={removeStaffService} className="btn btn-danger btn-sm m-1">Sil</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Staff
