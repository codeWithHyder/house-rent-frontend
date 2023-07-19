// App.js
import React from 'react';
import Navigation from './Navigation';
import MainPage from './Mainpage';
import '../style.css';

function App() {
  return (
    <div className="main-container">
      <Navigation />
      <h1>Rent a House</h1>
      <MainPage />
    </div>
  );
}

export default App;
