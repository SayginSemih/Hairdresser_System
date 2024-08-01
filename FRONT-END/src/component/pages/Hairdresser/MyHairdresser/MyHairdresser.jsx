import { useState, useEffect, useRef } from "react";
import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import axios from "axios";
import "./MyHairdresser.css";
import { useParams } from "react-router-dom";

function MyHairdresser() {

    const [hairdresserData, setHairdresserData] = useState([]);
    const [hairdresserFeedback, setHairdresserFeedback] = useState([]);
    const [hairdresserRating, setHairdresserRating] = useState(0);
    const [feedbackLoad, setFeedbackLoad] = useState(0);
    const inputNotification = useRef();
    const sendNotificationMessage = useRef();

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

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/user-get-hairdresser-feedback", {
            hairdresser_id: hairdresserData.hairdresser_id
        }).then(response => {
            if (response.data != "2") {
                setHairdresserFeedback(response.data.userfeedback)
                setHairdresserRating(response.data.rating)
                if (feedbackLoad != 1) {
                    setFeedbackLoad(1);
                }
            }
        })
    }, [feedbackLoad])

    function sendNotification() {
        const notificationMessage = inputNotification.current.value;
        if (!notificationMessage) {
            sendNotificationMessage.current.innerHTML = `
                <div class="alert alert-warning mt-2" role="alert">
                    Tüm alanlar dolu olmalıdır!
                </div>
            `;
        }
        else {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-send-notification", {
                hairdresser_id: hairdresserData.hairdresser_id,
                title: hairdresserData.name,
                message: notificationMessage
            }).then(response => {
                if (response.data == "1") {
                    sendNotificationMessage.current.innerHTML = `
                        <div class="alert alert-success mt-2" role="alert">
                            Bildiriminiz başarıyla gönderildi!
                        </div>
                    `;
                } else if (response.data == "2") {
                    sendNotificationMessage.current.innerHTML = `
                        <div class="alert alert-danger mt-2" role="alert">
                            Bildiriminiz gönderilirken bir hata meydana geldi!
                        </div>
                    `;
                }
            })
        }
    }

    function goAppointment(e) {
        window.location.href = "/hairdresser/appointments"
    }

    function goServicePage(e) {
        window.location.href = "/hairdresser/services"
    }

    return (
        <>
            <HairdresserHeader />
            {hairdresserData.sub_day === 0 ? (
                <div className="alert alert-danger m-2" role="alert">
                    Abonelik süreniz dolduğu için bu sistemden faydalanamazsınız, lütfen abone olunuz!
                </div>
            ) : (<>
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
                                <p class="kuaför-puan"><b>Puanınız:</b> {hairdresserRating.avg_rating == null ? ("Henüz puanlanmamış.") : (hairdresserRating.avg_rating)}</p>
                                <button onClick={goAppointment} id={hairdresserData.hairdresser_id} class="btn btn-randevu">Randevular</button>
                                <button onClick={goServicePage} id={hairdresserData.hairdresser_id} class="btn btn-randevu m-1">Hizmetlerim</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="container mt-4">

                    <div class="yorumlar">

                        <h2>Müşterilere Bildirim Gönder</h2>
                        <div ref={sendNotificationMessage}></div>
                        <div class="form-group">
                            <label for="yorum">Duyuru :</label>
                            <textarea ref={inputNotification} class="form-control" id="yorum" name="yorum" rows="3"></textarea>
                        </div>
                        <button onClick={sendNotification} type="submit" class="btn btn-primary mt-2">Gönder</button>

                        <h3>Kullanıcıların Yorumları</h3>
                        {hairdresserFeedback.map(hf => (
                            <div class="yorum-kutu">
                                <p><span class="yorum-puan">{hf.full_name} - Puan : {hf.rating}</span> - {hf.comments}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>)}
        </>
    )
}

export default MyHairdresser
