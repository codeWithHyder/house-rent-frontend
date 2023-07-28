import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/feature/UserSlice';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    if (token) {
      try {
        await dispatch(logoutUser());
        navigate('/sign_in');
      } catch (error) {
        // Handle any potential errors during the logout process here
        // eslint-disable-next-line no-console
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <nav>
      <ul className="navbar">
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoDV73D3hV_4yUErBD746LWfh_cru5spf5g&usqp=CAU"
            alt="house"
          />
        </li>
        <li>
          <NavLink to="/" activeClassName="active-link" exact>
            House
          </NavLink>
        </li>
        <li>
          <NavLink to="/reserve/:id" activeClassName="active-link">
            ReserveHouse
          </NavLink>
        </li>
        <li>
          <NavLink to="/myreservations" activeClassName="active-link">
            MyReservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/addhouse" activeClassName="active-link">
            AddHouse
          </NavLink>
        </li>
        <li>
          <NavLink to="/deletehouse" activeClassName="active-link">
            DeleteHouse
          </NavLink>
        </li>
        {token ? (
          <li>
            <button className="logout-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/sign_in">Log In</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
