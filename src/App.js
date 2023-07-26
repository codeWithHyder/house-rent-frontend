import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navigation from './components/sidebar/Navigation';
import AddHouse from './components/pages/AddHouse';
import './styling/style.css';
import './styling/navbar.css';
import './styling/mainPage.css';
import './styling/houseReserve.css';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/sign_in" element={<Login />} />
          <Route path="/sign_up" element={<Register />} />
        </Routes>
        <Navigation />
        <h1 className="rent-house">Home Stay</h1>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/house/:id" element={<HouseDetails />} />
          <Route path="/reserve/:id" element={<ReservePage />} />
          <Route path="/addhouse" element={<AddHouse />} />

          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
