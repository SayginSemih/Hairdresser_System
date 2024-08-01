import "./HairdresserHeader.css"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import logo from "../../../img/intro_logo.png"

function HairdresserHeader() {

  const [hairdresserData, setHairdresserData] = useState([]);

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
  }, [])

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo}
            class="logo-img image-settings" alt="logo" />
          <a class="navbar-brand" >{hairdresserData.name}</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/my-hairdresser">Kuaförüm</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/hairdresser/settings">Ayarlar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/appointments">Randevular</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/appointments/settings">Randevu Ayarla</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/staff">Personeller</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/services">Hizmetler</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresser/subscribe-type">Abone Ol</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hairdresserlogout">Çıkış</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default HairdresserHeader
