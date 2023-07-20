// // App.js
// import React from 'react';
// import Navigation from './Navigation';
// import MainPage from './Mainpage';
// import '../style.css';

// function App() {
//   return (
//     <div className="main-container">
//       <h1 className="rent-house">Rent a House</h1>
//       <Navigation />
//       <MainPage />
//     </div>
//   );
// }

import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import MainPage from './Mainpage';
import HouseDetails from './HouseDetails';
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
