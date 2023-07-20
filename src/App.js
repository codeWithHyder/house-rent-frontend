import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Navigation from './components/sidebar/Navigation';
import MainPage from './components/pages/Mainpage';
import HouseDetails from './components/pages/HouseDetails';
import '../style.css';

function App() {
  return (

    <div className="main-container">
      <h1 className="rent-house">Rent a House</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        {/* Add more routes here */}
      </Routes>
    </div>

  );
}

export default App;
