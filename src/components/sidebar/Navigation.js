import React from 'react';
// import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul className="navbar">
      <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoDV73D3hV_4yUErBD746LWfh_cru5spf5g&usqp=CAU" alt="house" /></li>
      <li><a href="#m">House</a></li>
      <li><a href="#d">Reserveform</a></li>
      <li><a href="#c">MyReservations</a></li>
      <li><a href="/addhouse">AddHouse</a></li>
      <li><a href="#c">DeleteHouse</a></li>
    </ul>
  </nav>
);

export default Navigation;
