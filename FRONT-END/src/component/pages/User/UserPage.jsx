import { useState, useEffect, useRef } from "react";
import UserHeader from "../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./UserPage.css";

function User() {


    //https://via.placeholder.com/300
    //../../../../SERVER/uploads
    const [userdata, setData] = useState([]);
    const [hairdresserData, setHairdresserData] = useState([]);
    
    const inputSearch = useRef();

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-user", {
                token: localStorage.getItem("userToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                }
            })
        }
        axios.get(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser")
        .then(response => {
            setHairdresserData(response.data)
            console.log(response.data)
        })

    }, [])

    function goHairdresserPage(e) {
        window.location.href=`/user/hairdressers/${e.target.id}`;
    }

    function Search() {
        const find = inputSearch.current.value;
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-find-hairdresser", {
            find
        }).then(response => {
            if (response.data != "2") {
                setHairdresserData(response.data)
            }
        })
    }

    return (
        <>
            <UserHeader />
            <div class="bg-warning p-2">
                <div class="row">
                    <div class="col-md-3">
                        <b>Kuaför Ara:</b>
                        <div class="input-group">
                            <input ref={inputSearch} type="text" class="form-control" placeholder="Ara" aria-label="Ara" aria-describedby="button-addon2" />
                            <div class="input-group-append">
                                <button onClick={Search} class="btn btn-outline-secondary" type="button" id="button-addon2">Ara</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-4">
                <div class="row">
                    {hairdresserData.map(h => (
                        <div key={h.hairdresser_id} id={h.hairdresser_id} class="col-lg-3 col-md-6 mb-4" onClick={goHairdresserPage}>
                            <div id={h.hairdresser_id} class="card kuaför-kutusu">
                                <img id={h.hairdresser_id} src={import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/" + h.filename} class="card-img-top" alt="..." />
                                <div id={h.hairdresser_id} class="card-body">
                                    <h5 id={h.hairdresser_id} class="card-title">{h.name}</h5>
                                    <p id={h.hairdresser_id} class="card-text"><b>Tel :</b> {h.phone_number}</p>
                                    <p id={h.hairdresser_id} class="card-text"><b>Puan :</b> {h.rating == 0.00 ? ("Puanlanmamış.") : (h.rating)}</p>
                                    <p id={h.hairdresser_id} class="card-text">Rezarvasyon için tıkla.</p>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default User
