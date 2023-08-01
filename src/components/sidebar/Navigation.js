/* eslint-disable */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { TbLogout } from 'react-icons/tb';
import { logoutUser } from '../../Redux/feature/UserSlice';
import logo from '../../logo/g2hay relators_adobe_express.svg';

const Navigation = ({ closeModal }) => {
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

  const disableLinkStyle = {
    pointerEvents: 'none',
    color: 'grey',
  };

  return (
    <nav className="navbar-container"> 
      <div className="navbar">
        <div className='nav-items'>
          <div className="nav-close">
            <p className='fincap-logo'>FINCAP HOUSE RENT</p>
            <FontAwesomeIcon icon={faX} onClick={closeModal} className="fa-close" />  
          </div>
          <ul className="nav-itm-container">
            <li>
              <NavLink to="/" activeClassName="active-link" exact>
                House
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserve/:id" activeClassName="active-link reserve-house-link">
                ReserveHouse
              </NavLink>
            </li>
            {token ? (
              <li>
                <NavLink to="/myreservations" activeClassName="active-link">
                  MyReservations
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/" style={disableLinkStyle}>
                  MyReservations
                </NavLink>
              </li>
            )}
            {token && JSON.parse(localStorage.getItem('user')).role === 'admin' ? (
              <>
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
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/" activeClassName="active-link" style={disableLinkStyle}>
                    AddHouse
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" activeClassName="active-link" style={disableLinkStyle}>
                    DeleteHouse
                  </NavLink>
                </li>
              </>
            )}
            {token ? (
              <li className="log_btn">
                <button className="logout-btn" type="button" onClick={handleLogout}>
                  Logout
                  <TbLogout />
            </button>
              </li>
            ) : (
              <li>
                <NavLink to="/sign_in">Log In</NavLink>
              </li>
            )}
          </ul>
        </div>
        
      </div>
    </nav>
  );
};

export default Navigation;
