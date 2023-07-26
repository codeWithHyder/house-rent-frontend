import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import ReservePage from './components/pages/ReservePage';
import AddHouse from './components/pages/AddHouse';
import Navigation from './components/sidebar/Navigation';
import './style.css';
import './navbar.css';
import './mainPage.css';
import './houseReserve.css';

function App() {
  return (
    <Router>
      <div className="main-container">
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
