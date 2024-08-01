import { useEffect, useRef, useState } from "react";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

function Services() {

    const [hairdresserData, setData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [uploadServices, setUploadServices] = useState(0);
    const [addService, setAddService] = useState(0);
    const inputServiceName = useRef();
    const inputServiceDescription = useRef();
    const inputPrice = useRef();
    const inputPoint = useRef();
    const inputImage = useRef();
    const serviceMessage = useRef();
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                    if (uploadServices != 1)
                        setUploadServices(1)
                }
            })
        }

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/list-service", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            setServiceData(response.data);
            console.log(response.data)
        })

    }, [uploadServices, serviceData, addService])

    function Add() {
        const service_name = inputServiceName.current.value;
        const service_description = inputServiceDescription.current.value;
        const price = inputPrice.current.value;
        const point = inputPoint.current.value;
        const image = inputImage.current.files[0];

        if (!service_name || !service_description || !price || !point) {
            serviceMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Resim harici diğer kısımlar boş bırakılamaz!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/create-service", {
                service_name,
                service_description,
                price,
                point,
                image,
                hairdresser_id: hairdresserData.hairdresser_id
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.data == "1") {
                        serviceMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Hizmet kayıt işlemi başarılı!
                        </div>
                    `;
                        setAddService(addService + 1)
                    }
                    else if (response.data == "2") {
                        serviceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Hizmet kayıt işlemi sırasında bir hata meydana geldi!
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
        const service_name = isInput(0)
        const service_description = isInput(1)
        const price = isInput(2)
        const point = isInput(3)
        const image = e.target.parentElement.parentElement.children[4].children[0].files[0];

        if (!service_name || !service_description || !price || !point) {
            serviceMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Resim harici diğer kısımlar boş bırakılamaz!
                </div>
            `;
        } else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/update-service", {
                service_name,
                service_description,
                price,
                point,
                image,
                hairdresser_id: hairdresserData.hairdresser_id,
                service_id: e.target.id
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.data == "1") {
                        serviceMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Personel güncelleme işlemi başarılı!
                    </div>
                `;
                    } else if (response.data == "2") {
                        serviceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Personel güncelleme işlemi sırasında bir hata meydana geldi!
                        </div>
                    `;
                    }
                })
        }
    }

    function Remove(e) {
        const service_id = e.target.id;
        const success = confirm("Silmek istediğinize emin misiniz?");
        if (success) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser/services/remove-service", {
                service_id,
                hairdresser_id: hairdresserData.hairdresser_id,
            }).then(response => {
                if (response.data == "1") {
                    serviceMessage.current.innerHTML = `
                    <div class="alert alert-success mt-2" role="alert">
                        Hizmet silme işlemi başarılı!
                    </div>
                `;
                    const newData = staffData.filter(s => s.staff_id !== e.target.id)
                    setServiceData(newData)
                } else if (response.data == "2") {
                    serviceMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Hizmet silme işlemi sırasında bir hata meydana geldi!
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
                <div className="container mt-4">
                    <div ref={serviceMessage}></div>
                    <h2>Hizmet Ekle</h2>

                    <div className="row">
                        <div className="col">
                            <input
                                ref={inputServiceName}
                                type="text"
                                className="form-control"
                                placeholder="Hizmet Adı"
                                name="firstName"
                            />
                        </div>
                        <div className="col">
                            <input
                                ref={inputServiceDescription}
                                type="text"
                                className="form-control"
                                placeholder="Hizmet Açıklaması"
                                name="lastName"
                            />
                        </div>
                        <div className="col">
                            <input
                                ref={inputPrice}
                                type="text"
                                className="form-control"
                                placeholder="Ücreti"
                                name="position"
                            />
                        </div>
                        <label htmlFor="">Puan %:</label>
                        <div className="col">
                            <select
                                ref={inputPoint}
                                placeholder="Yüzdelik"
                                className="form-control"
                                id="">
                                {numbers.map((number, index) => (
                                    <option key={index}>{number}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <input
                                ref={inputImage}
                                type="file"
                                class="form-control"
                                name="image"
                                id="image"
                                accept="image/*"
                            />
                        </div>
                        <div className="col-auto">
                            <button onClick={Add} type="button" className="btn btn-primary">
                                Ekle
                            </button>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <h2 className="mb-4">Hizmet Listesi</h2>

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Hizmet Adı</th>
                                        <th>Hizmet Açıklaması</th>
                                        <th>Ücreti</th>
                                        <th>Puan %</th>
                                        <th>Resim</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceData.map(s => (
                                        <tr key={s.service_id}>
                                            <td><input type="text" className="form-control" defaultValue={s.service_name} /></td>
                                            <td><input type="text" className="form-control" defaultValue={s.service_description} /></td>
                                            <td><input type="text" className="form-control" defaultValue={s.price} /></td>
                                            <td><input type="text" className="form-control" defaultValue={s.point} /></td>
                                            <td><input type="file" class="form-control" name="image" id="image" accept="image/*" /></td>
                                            <td>
                                                <button id={s.service_id} onClick={Update} className="btn btn-warning btn-sm m-1">Güncelle</button>
                                                <button id={s.service_id} onClick={Remove} className="btn btn-danger btn-sm m-1">Sil</button>
                                            </td>
                                        </tr>
                                    ))

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Services
