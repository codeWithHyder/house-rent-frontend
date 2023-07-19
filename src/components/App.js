// App.js
import React from 'react';
import Navigation from './Navigation';
import Login from './Login';
import Reserve from './Reserve';
import Details from './Details';
import AddItem from './AddItem';

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
