import { useState, useEffect, useRef } from "react";
import UserHeader from "../../../Header/UserHeader/UserHeader.jsx";
import axios from "axios";
import "./HairdresserPage.css";
import { useParams } from "react-router-dom";

function HairdresserPage() {

    const { hairdresser_id } = useParams();
    const [userdata, setData] = useState([]);
    const [hairdresserData, setHairdresserData] = useState([]);
    const [hairdresserFeedback, setHairdresserFeedback] = useState([]);
    const [hairdresserRating, setHairdresserRating] = useState(0);
    const inputRating = useRef();
    const inputComments = useRef();
    const sendFeedbackMessage = useRef();

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
        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-get-hairdresser", {
            hairdresser_id
        })
            .then(response => {
                if (response.data == "3" || response.data == "2") {
                    window.location.href = "/user"
                }
                else {
                    setHairdresserData(response.data)
                }
            })

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-get-hairdresser-feedback", {
            hairdresser_id
        }).then(response => {
            if (response.data != "2") {
                setHairdresserFeedback(response.data.userfeedback)
                setHairdresserRating(response.data.rating)
            }
        })
    }, [])

    function sendFeedback() {
        const userRating = inputRating.current.value;
        const userComments = inputComments.current.value;
        if (!userRating || !userComments) {
            sendFeedbackMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-send-feedback", {
                user_id: userdata.user_id,
                hairdresser_id,
                rating: userRating,
                comments: userComments
            }).then(response => {
                if (response.data == "1") {
                    sendFeedbackMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Değerlendirmeniz başarıyla gönderildi!
                        </div>
                    `;
                } else if (response.data == "2") {
                    sendFeedbackMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Değerlendirmeniz gönderilirken bir hata meydana geldi!
                        </div>
                    `;
                } else if (response.data == "3") {
                    sendFeedbackMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Bu kuaför için zaten daha önceden bir değerlendirme göndermişsiniz!
                        </div>
                    `;
                }
            })
        }
    }

    function goAppointment(e) {
        window.location.href="/user/hairdressers/appointment/" + e.target.id
    }

    function goServicePage(e) {
        window.location.href="/user/hairdressers/services/" + e.target.id
    }

    return (
        <>
            <UserHeader />
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <img src={import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/" + hairdresserData.filename} class="img-fluid" alt="Kuaför Kapak Fotoğrafı" />
                    </div>
                    <div class="col-md-6">
                        <div class="kuaför-bilgi">
                            <h2 class="kuaför-baslik">{hairdresserData.name}</h2>
                            <p><b>Telefon:</b> {hairdresserData.phone_number}</p>
                            <p><b>Adres:</b> {hairdresserData.address}</p>
                            <p class="kuaför-puan"><b>Puan:</b> {hairdresserRating.avg_rating == null ? ("Henüz puanlanmamış.") : (hairdresserRating.avg_rating)}</p>
                            <button onClick={goAppointment} id={hairdresserData.hairdresser_id} class="btn btn-randevu">Randevu Al</button>
                            <button onClick={goServicePage} id={hairdresserData.hairdresser_id} class="btn btn-randevu m-1">Hizmetler</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="container mt-4">
                <h2>Kuaför Puanlama ve Yorum</h2>
                <div ref={sendFeedbackMessage}></div>
                <div class="form-group">
                    <label for="puan">Puan:</label>
                    <select ref={inputRating} class="form-control" id="puan" name="puan">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="yorum">Yorum:</label>
                    <textarea ref={inputComments} class="form-control" id="yorum" name="yorum" rows="3"></textarea>
                </div>
                <button onClick={sendFeedback} type="submit" class="btn btn-primary mt-2">Gönder</button>

                <div class="yorumlar">
                    <h3>Diğer Kullanıcıların Yorumları</h3>
                    {hairdresserFeedback.map(hf => (
                        <div class="yorum-kutu">
                            <p><span class="yorum-puan">{hf.full_name} - Puan : {hf.rating}</span> - {hf.comments}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HairdresserPage
