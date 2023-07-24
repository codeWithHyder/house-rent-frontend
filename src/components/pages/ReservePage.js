import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ReservePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // const location = useLocation();
  const houses = useSelector((state) => state.house.houseData);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleHouseChange = (e) => {
    setSelectedHouse(e.target.value);
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
      {/* <h2 className="reserve-hs"> */}
      <div className="house-reserve-details">
        <p className="headline">On Home Stay ,We have range of huses from 1 BHK to 5 BHK equipped with every facility</p>
        <label htmlFor="select-house">
          Select a House:
          <select className="select-house-option" id="select-house" value={selectedHouse} onChange={handleHouseChange}>
            <option value="">Select a house</option>
            {houses.map((house) => (
              <option key={house.id} value={house.title}>
                {house.title}
              </option>
            ))}
          </select>
        </label>
        <div className="date-city">
          <label htmlFor="date">

            <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
          </label>
          <label htmlFor="city">

            <select className="city" id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">Select a city</option>
              <option value="City A">City A</option>
              <option value="City B">City B</option>
              <option value="City C">City C</option>
              <option value="City D">City D</option>
              <option value="City E">City E</option>
              <option value="City F">City F</option>
              {/* Add more options for cities */}
            </select>
          </label>
        </div>
        <button className="btn-reserve" type="button" onClick={handleReserve}>
          Reserve
        </button>
        <Link to="/">
          <button type="button" className="btn-back">
            &#8592; Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReservePage;
