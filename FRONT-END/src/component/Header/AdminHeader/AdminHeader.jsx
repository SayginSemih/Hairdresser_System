import "./AdminHeader.css"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import logo from "../../../img/intro_logo.png"

function AdminHeader() {
  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src={logo}
            class="logo-img image-settings" alt="logo" />
          <a class="navbar-brand" >ADMIN PANEL</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/admin">Uygulama Detayları</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/hairdressers">Kuaförler</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/subscribe-details">Abonelikler</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin/approved">Onaylar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/adminlogout">Çıkış</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default AdminHeader
