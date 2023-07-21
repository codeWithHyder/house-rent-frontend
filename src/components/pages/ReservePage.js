import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const ReservePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  //   const currentUser = useSelector((state) => state.currentUser);
  const location = useLocation();
  const selectedHouse = location.state ? location.state.house : null;

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleReserve = () => {
    // Implement your reservation logic here
    // console.log('Reserve house:', selectedHouse, 'on', selectedDate, 'in', selectedCity);
  };

  return (
    <div className="reserve-page">
      <h2 className="reserve-hs">Reserve a House</h2>
      {/* <p>
        Username:
        {currentUser.username}
      </p> */}
      <p>
        {/* Selected House: */}
        <img className="reserve-img" src={selectedHouse.imageUrl} alt={selectedHouse.title} />
      </p>
      <p className="house-title">
        Selected House Title:
        <span>{selectedHouse ? selectedHouse.title : 'None'}</span>
      </p>
      <p className="house-id">
        Selected House ID:
        <span>{selectedHouse ? selectedHouse.id : 'None'}</span>
      </p>
      <label htmlFor="date">
        Select a date:
        <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
      </label>
      <label htmlFor="city">
        Select a city:
        <select id="city" value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          <option value="City A">City A</option>
          <option value="City B">City B</option>
          <option value="City A">City c</option>
          <option value="City B">City D</option>
          <option value="City A">City E</option>
          <option value="City B">City F</option>
          {/* Add more options for cities */}
        </select>
      </label>
      <button className="btn-reserve" type="button" onClick={handleReserve}>Reserve House</button>
      <Link to="/">Back to Main</Link>
    </div>
  );
};

export default ReservePage;
