import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/sidebar/Navigation';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import './style.css';

function App() {
  return (

    <div className="main-container">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/house/:id" element={<HouseDetails />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>

  );
}

export default App;
