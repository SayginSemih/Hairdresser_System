import { useEffect, useState } from 'react'
import './App.css'
import Header from "./component/Header/UserHeader/UserHeader.jsx"
import Footer from "./component/Footer/Footer.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import UserLoginPage from './component/pages/LoginPages/UserLoginPage/UserLoginPage.jsx';
import axios from "axios";
import LoginTypePage from './component/pages/LoginPages/LoginTypePage/LoginTypePage.jsx'
import HairdresserLoginPage from './component/pages/LoginPages/HairdresserLoginPage/HairdresserLoginPage.jsx';
import HairdresserRegisterPage from './component/pages/RegisterPages/HairdresserRegisterPage/HairdresserRegisterPage.jsx';
import AdminLoginPage from './component/pages/LoginPages/AdminLoginPage/AdminLoginPage.jsx';
import UserRegisterPage from './component/pages/RegisterPages/UserRegisterPage/UserRegisterPage.jsx';
import User from './component/pages/User/UserPage.jsx';
import AdminPage from './component/pages/Admin/AdminPage.jsx';
import Hairdresser from './component/pages/Hairdresser/Hairdresser.jsx';
import Verification from './component/pages/LoginPages/Verification/Verification.jsx';
import ApprovedHairdresser from './component/pages/Admin/ApprovedHairdresser/ApprovedHairdresser.jsx';
import UserCheckEmail from './component/pages/LoginPages/UserForgotPassword/UserCheckEmail.jsx';
import UserChangePassword from './component/pages/LoginPages/UserForgotPassword/UserChangePassword.jsx';
import HairdresserCheckEmail from './component/pages/LoginPages/HairdresserForgotPassword/HairdresserCheckEmail.jsx';
import HairdresserChangePassword from './component/pages/LoginPages/HairdresserForgotPassword/HairdresserChangePassword.jsx';
import UserProfile from './component/pages/User/Profile/UserProfile.jsx';
import UserChangePass from './component/pages/User/ChangePassword/UserChangePass.jsx';
import HairdresserSettings from './component/pages/Hairdresser/HairdresserSettings/HairdresserSettings.jsx';
import Staff from './component/pages/Hairdresser/Staff/Staff.jsx';
import HairdresserPage from './component/pages/User/HairdresserPage/HairdresserPage.jsx';
import AppointmentsSettings from './component/pages/Hairdresser/AppointmentsSettings/AppointmentsSettings.jsx';
import UserAppointments from './component/pages/User/Appointments/UserAppointments.jsx';
import AppointmentList from './component/pages/Hairdresser/Appointments/AppointmentList.jsx';
import Services from './component/pages/Hairdresser/Services/Services.jsx';
import UserServices from './component/pages/User/Services/UserServices.jsx';
import UserService from './component/pages/Hairdresser/UserService/UserService.jsx';
import UserLoyaltyPoints from './component/pages/User/loyaltypoints/UserLoyaltyPoints.jsx';
import UserNatifications from './component/pages/User/Notifications/UserNatifications.jsx';
import MyHairdresser from './component/pages/Hairdresser/MyHairdresser/MyHairdresser.jsx';
import AdminHairdresser from './component/pages/Admin/Hairdressers/AdminHairdresser.jsx';
import SubscribeType from './component/pages/Hairdresser/SubscribeType/SubscribeType.jsx';
import Sub1 from './component/pages/Hairdresser/Sub1/Sub1.jsx';
import Sub2 from './component/pages/Hairdresser/Sub2/Sub2.jsx';
import SubscribeDetails from './component/pages/Admin/SubscribeDetails/SubscribeDetails.jsx';

function NotFound() {

  return (
    <>
      <center><h1>SAYFA BULUNAMADI</h1></center>
    </>
  )
}

function UserLogout() {
  localStorage.removeItem('userToken');
  window.location.href = "/";
}

function HairdresserLogout() {
  localStorage.removeItem('hairdresserToken');
  window.location.href = "/";
}


function AdminLogout() {
  localStorage.removeItem('adminToken');
  window.location.href = "/";
}

function PaymentSucces() {
  return (
    <>
    <br />
      <b><center>ÖDEMENİZ BAŞARILI LÜTFEN HESABINIZDAN ÇIKIŞ YAPIPI TEKRAR GİRİNİZ</center></b>
      <br />
      <center><a href="/hairdresserlogout">Çıkış Yap</a></center>
    </>
  )
}

function PaymentError() {
  return (
    <>
    <br />
      <b><center>ÖDEMENİZ BAŞARISIZ</center></b>
      <br />
      <center><a href="/hairdresser/my-hairdresser">Anasayfaya Dön</a></center>
    </>
  )
}

function App() {

  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isHairdresser, setHairdresser] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      if (localStorage.getItem("userToken")) {
        try {
          const response = await axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-user", {
            token: localStorage.getItem("userToken")
          });
          setLogin(response.data.data === 1);
        } catch (error) {
          console.error("User token check error:", error);
          setLogin(false);
        }
      }

      if (localStorage.getItem("adminToken")) {
        try {
          const response = await axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-admin", {
            token: localStorage.getItem("adminToken")
          });
          setAdmin(response.data.data === 1);
        } catch (error) {
          console.error("Admin token check error:", error);
          setAdmin(false);
        }
      }

      if (localStorage.getItem("hairdresserToken")) {
        try {
          const response = await axios.post(import.meta.env.VITE_REACT_APP_SERVER_HOSTING + "/check-hairdresser", {
            token: localStorage.getItem("hairdresserToken")
          });
          setHairdresser(response.data.data === 1);
        } catch (error) {
          console.error("Hairdresser token check error:", error);
          setHairdresser(false);
        }
      }

      setLoading(false); // Yükleme durumu bittiğinde false yapın
    };

    checkTokens();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleniyor durumu
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginTypePage />} />
          <Route path="/user/login" element={isLogin ? <User /> : <UserLoginPage />} />
          <Route path="/user/register" element={isLogin ? <User /> : <UserRegisterPage />} />
          <Route path="/user" element={isLogin ? <User /> : <UserLoginPage />} />
          <Route path="/user/profile" element={isLogin ? <UserProfile /> : <UserLoginPage />} />
          <Route path="/user/change-password" element={isLogin ? <UserChangePass /> : <UserLoginPage />} />
          <Route path="/hairdresser/register" element={<HairdresserRegisterPage />} />
          <Route path="/hairdresser" element={isHairdresser ? <Hairdresser /> : <HairdresserLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={isAdmin ? <AdminPage /> : <AdminLoginPage />} />s
          <Route path="/hairdresser/login" element={<HairdresserLoginPage />} />
          <Route path="/hairdresser/settings" element={isHairdresser ? <HairdresserSettings /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/staff" element={isHairdresser ? <Staff /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/appointments/settings" element={isHairdresser ? <AppointmentsSettings /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/appointments" element={isHairdresser ? < AppointmentList /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/services" element={isHairdresser ? < Services /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/user-service/:uniquecode" element={isHairdresser ? < UserService /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/my-hairdresser" element={isHairdresser ? < MyHairdresser /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/subscribe-type" element={isHairdresser ? < SubscribeType /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/sub-1-payment" element={isHairdresser ? < Sub1 /> : <HairdresserLoginPage />} />
          <Route path="/hairdresser/sub-2-payment" element={isHairdresser ? < Sub2 /> : <HairdresserLoginPage />} />
          <Route path="/odeme_basarili" element={isHairdresser ? < PaymentSucces /> : <HairdresserLoginPage />} />
          <Route path="/odeme_hata" element={isHairdresser ? < PaymentError /> : <HairdresserLoginPage />} />
          <Route path="/verification/:uniquecode/:approvedcode" element={<Verification />} />
          <Route path="/userlogout" element={<UserLogout />} />
          <Route path="/hairdresserlogout" element={<HairdresserLogout />} />
          <Route path="/admin/approved" element={isAdmin ? <ApprovedHairdresser /> : <AdminLoginPage />} />s
          <Route path="/admin/hairdressers" element={isAdmin ? <AdminHairdresser /> : <AdminLoginPage />} />s
          <Route path="/admin/subscribe-details" element={isAdmin ? <SubscribeDetails /> : <AdminLoginPage />} />s
          <Route path="/adminlogout" element={<AdminLogout />} />
          <Route path="/user/forgotpassword" element={<UserCheckEmail />} />
          <Route path="/user/forgotpassword/:uniquecode/:cpcode" element={<UserChangePassword />} />
          <Route path="/user/hairdressers/:hairdresser_id" element={isLogin ? <HairdresserPage /> : <UserLoginPage />} />
          <Route path="/user/hairdressers/appointment/:hairdresser_id" element={isLogin ? <UserAppointments /> : <UserLoginPage />} />
          <Route path="/user/hairdressers/services/:hairdresser_id" element={isLogin ? <UserServices /> : <UserLoginPage />} />
          <Route path="/user/loyaltypoints" element={isLogin ? <UserLoyaltyPoints /> : <UserLoginPage />} />
          <Route path="/user/notifications" element={isLogin ? <UserNatifications /> : <UserLoginPage />} />
          <Route path="/hairdresser/forgotpassword" element={<HairdresserCheckEmail />} />
          <Route path="/hairdresser/forgotpassword/:hairdresser_id/:cpcode" element={<HairdresserChangePassword />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
