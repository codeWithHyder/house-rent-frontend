// App.js
import React from 'react';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Reserve from './components/Reserve';
import Details from './components/Details';
import AddItem from './components/AddItem';

function App() {
  return (
    <div>
      <Navigation />
      <Login />
      <Reserve />
      <Details />
      <AddItem />
      {/* Main content goes here */}
    </div>
  );
}

export default App;
