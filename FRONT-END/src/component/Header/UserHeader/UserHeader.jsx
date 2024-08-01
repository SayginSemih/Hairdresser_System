import "./UserHeader.css"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import logo from "../../../img/intro_logo.png"

function UserHeader() {

  const [userdata, setData] = useState([]);

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
  }, [])

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo}
            class="logo-img image-settings" alt="logo" />
          <a class="navbar-brand" >{userdata.name} {userdata.surname}</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/user">Kuaförler</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/user/profile">Profil</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/user/change-password">Şifre Değiştir</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/user/notifications">Bildirimler</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/user/loyaltypoints">Sadakat Puanları</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/userlogout">Çıkış</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default UserHeader
