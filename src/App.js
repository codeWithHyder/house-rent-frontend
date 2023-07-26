import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { addHouse } from './Redux/feature/houseSlice';
import './styling/style.css';
import './styling/navbar.css';
import './styling/mainPage.css';
import './styling/houseReserve.css';
import { addHouse } from './Redux/feature/houseSlice';

function App() {
  return (

    <div className="main-container">
      <Router>
        <Routes>
          <Route path="/sign_in" element={<Login />} />
          <Route path="/sign_up" element={<Register />} />
          <Route element={<Navigation />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/house/:id" element={<HouseDetails />} />
            <Route path="/reserve/:id" element={<ReservePage />} />
            <Route path="/addhouse" element={<AddHouse />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
