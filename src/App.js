import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/sidebar/Navigation';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './style.css';
import './navbar.css';
import './mainPage.css';

function App() {
  return (

    <div className="main-container">
      <h1 className="rent-house">Home Stay</h1>
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
