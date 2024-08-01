import "./Header.css"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import logo from "../../img/intro_logo.png"

function Header() {
  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo}
            class="logo-img image-settings" alt="logo" />
          <a class="navbar-brand" >SEMİH SAYGIN</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Profil</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Bildirimler</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Sadakat Puanları</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Çıkış</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div class="bg-warning p-2">
        <div class="row">
          <div class="col-md-3">
            <b>Kuaför Ara:</b>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Ara" aria-label="Ara" aria-describedby="button-addon2" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Ara</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="card kuaför-kutusu">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Kuaför Adı 1</h5>
                <p class="card-text">Puan: 4.5</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="card kuaför-kutusu">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Kuaför Adı 2</h5>
                <p class="card-text">Puan: 4.0</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="card kuaför-kutusu">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Kuaför Adı 3</h5>
                <p class="card-text">Puan: 4.2</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="card kuaför-kutusu">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
              <div class="card-body">+
                <h5 class="card-title">Kuaför Adı 4</h5>
                <p class="card-text">Puan: 4.2</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="card kuaför-kutusu">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Kuaför Adı 5</h5>
                <p class="card-text">Puan: 4.2</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Header
