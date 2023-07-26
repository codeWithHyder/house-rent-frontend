import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul className="navbar">
      <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoDV73D3hV_4yUErBD746LWfh_cru5spf5g&usqp=CAU" alt="house" /></li>
      <li><NavLink to="#" activeClassName="active-link" exact>House</NavLink></li>
      <li><NavLink to="/reserve/:id" activeClassName="active-link">ReserveHouse</NavLink></li>
      <li><NavLink to="#" activeClassName="active-link">MyReservations</NavLink></li>
      <li><NavLink to="#" activeClassName="active-link">AddHouse</NavLink></li>
      <li><NavLink to="#" activeClassName="active-link">DeleteHouse</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;
