import HairdresserHeader from "../../../Header/HairdresserHeader/HairdresserHeader.jsx";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Sub1() {

    const [hairdresserData, setData] = useState([]);
    const [tokenUpload, setTokenUpload] = useState(0);
    const iframeToken = useRef();

    useEffect(() => {
        if (localStorage.getItem("hairdresserToken")) {
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
                token: localStorage.getItem("hairdresserToken")
            }).then(response => {
                if (response.data.data == 1) {
                    setData(response.data.userdata.data)
                    if (tokenUpload != 1) {
                        setTokenUpload(1);
                    }
                }
            })
        }
            axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/hairdresser-payment", {
                basket_name: 'Aylık Abonelik',
                email: hairdresserData.email,
                hairdresser_name: hairdresserData.name,
                hairdresser_address: hairdresserData.address,
                phone_number: hairdresserData.phone_number,
                amount: import.meta.env.VITE_REACT_APP_SUB1PRICE,
                hairdresser_id: hairdresserData.hairdresser_id,
                sub_day: 30
            }).then(response => {
                console.log("DATA", response.data)
                if (response.data == "3") 
                {
                    iframeToken.current.src="<div>Yükleniyor...</div>"
                }
                else {
                    iframeToken.current.src=`https://www.paytr.com/odeme/guvenli/${response.data.iframetoken}`
                }
            })
    }, [tokenUpload])

    return (
        <>
            <HairdresserHeader />
            <iframe ref={iframeToken} src="" frameborder="0" style={{ width: "100%", height: "100vh" }}></iframe>
        </>
    )
}

export default Sub1
