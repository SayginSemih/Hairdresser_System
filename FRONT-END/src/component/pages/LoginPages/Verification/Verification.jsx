import React, { useEffect, useState } from 'react';
import "./Verification.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Verification() {

    const { uniquecode, approvedcode } = useParams();
    const [ data, setData ] = useState(0);

    useEffect(() => {

        axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/verification", {
            uniquecode,
            approvedcode
        }).then(response => {
            if (response.data == "1") {
                setData(1)
            }
            else if (response.data == "2") {
                setData(2)
            }
        })
    }, [])

    return (
        <>
            {data == 1 ? (
                <div class="container">
                    <div class="text-center mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M7.293 11.293a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L7 9.586 4.707 7.293a1 1 0 1 0-1.414 1.414l3.5 3.5z" />
                            <path fill-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z" />
                        </svg>
                        <p class="success-text mt-3">Hesabınız başarıyla doğrulandı</p>
                    </div>
                </div>
            ) : (
                <div class="container">
                    <div class="text-center mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="red" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                            <path d="M8 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm0-1a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm-.5-8a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 1 0z" />
                        </svg>
                        <p class="error-text mt-3">Hesap doğrulama işlemi başarısız</p>
                    </div>
                </div>
            )
            }
        </>
    );
}

export default Verification;