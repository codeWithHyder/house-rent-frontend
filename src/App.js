import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/sidebar/Navigation';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './styling/style.css';
import './styling/navbar.css';
import './styling/mainPage.css';
import './styling/houseReserve.css';

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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
