// App.js
import React from 'react';
import Navigation from './Navigation';
import MainPage from './Mainpage';
import '../style.css';

function App() {
  return (
    <div className="main-container">
      <h1 className="rent-house">Rent a House</h1>
      <Navigation />
      <MainPage />
    </div>
  );
}

export default App;
