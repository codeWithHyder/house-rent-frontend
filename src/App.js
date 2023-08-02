import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import DeleteHouse from './components/pages/DeleteHouse';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Navigation from './components/sidebar/Navigation';
import AddHouse from './components/pages/AddHouse';
import MyReservation from './components/pages/MyReservation';
// import './styling/style.css';
// import './styling/navbar.css';
// import './styling/mainPage.css';
import './styling/houseReserve.css';
import setupAxiosInterceptors from './helpers/setupAxiosInterceptors';

setupAxiosInterceptors();

const App = () => (
  <Router>
    <div className="main-container">
      <Routes>
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/myreservations" element={<MyReservation />} />
        <Route path="/addhouse" element={<AddHouse />} />
        <Route path="/deletehouse" element={<DeleteHouse />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/reserve/:id" element={<ReservePage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
