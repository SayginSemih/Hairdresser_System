import { useEffect, useState, useRef } from "react";
import AdminHeader from "../../../Header/AdminHeader/AdminHeader.jsx";
import "./AdminHairdresser.css"
import axios from "axios";

function AdminHairdresser() {

    const [hairdresserList, setHairdresserList] = useState([]);

    const hairdresserMessage = useRef();

    useEffect(() => {

        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-get-hairdressers")
            .then(response => {
                if (response.data != "2") {
                    setHairdresserList(response.data)
                }
            })

    }, [])

    function Update(e) {

        function isInput(id) {
            const inp = e.target.parentElement.parentElement.children[id].children[0].value
            return inp
        }
        const hairdresser_id = e.target.id;
        const name = isInput(0);
        const phone_number = isInput(1);
        const email = isInput(2);
        const sub_day = isInput(3);
        if (!name || !phone_number || !email || !sub_day) {
            hairdresserMessage.current.innerHTML = `
            <div class="alert alert-warning mt-2" role="alert">
                Lütfen tüm alanları doldurunuz!
            </div>
        `;
        } else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-update-hairdressers", {
                hairdresser_id,
                name,
                phone_number,
                email,
                sub_day
            }).then(response => {
                if (response.data == "1") {
                    hairdresserMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Kuaför güncelleme işlemi başarılı!
                    </div>
                `;
                } else if (response.data == "2") {
                    hairdresserMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Kuaför güncelleme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function Remove(e) {
        const hairdresser_id = e.target.id;
        const success = confirm("Silmek istediğinize emin misiniz?");
        if (success) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/admin-remove-hairdressers", {
                hairdresser_id
            }).then(response => {
                if (response.data == "1") {
                    hairdresserMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Kuaför silme işlemi başarılı!
                    </div>
                `;
                const newData = staffData.filter(s => s.staff_id !== e.target.id)
                setStaffData(newData)
                setRemoveStaff(removeStaff + 1)
                } else if (response.data == "2") {
                    hairdresserMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Kuaför silme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    return (
        <>
            <AdminHeader />
            <div className="container mt-4">
                <h2 className="mb-4">Kuaför Listesi</h2>
                <div ref={hairdresserMessage}></div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Kuaför Adı</th>
                                <th>Telefonu</th>
                                <th>E-Maili</th>
                                <th>Kalan Abonelik Günü</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hairdresserList.map(h => (
                                <tr key={h.hairdresser_id}>
                                    <td><input type="text" className="form-control" defaultValue={h.name} /></td>
                                    <td><input type="text" className="form-control" defaultValue={h.phone_number} /></td>
                                    <td><input type="text" className="form-control" defaultValue={h.email} /></td>
                                    <td><input type="text" className="form-control" defaultValue={h.sub_day} /></td>
                                    <td>
                                        <button onClick={Update} id={h.hairdresser_id} className="btn btn-warning btn-sm m-1">Güncelle</button>
                                        <button id={h.hairdresser_id} className="btn btn-danger btn-sm m-1">Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminHairdresser
