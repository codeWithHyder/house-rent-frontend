/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReservation } from '../../Redux/feature/reservationsSlice';

const ReservePage = () => {
  const dispatch = useDispatch();
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
    // Check if all the necessary fields are filled
    if (!selectedHouse || !selectedDate || !selectedCity) {
      alert('Please select a house, date, and city to make a reservation.');
      return;
    }

    // Create an object to send in the API call
    const reservationData = {
      houseId: selectedHouse, // Assuming the selectedHouse value is the house ID
      reservationDate: selectedDate,
      location: selectedCity,
    };

    // Dispatch the createReservation async action with the reservationData object
    dispatch(createReservation(reservationData))
      .then(() => {
        alert('Reservation created successfully!');
        // Handle any additional logic or navigation after successful reservation creation
      })
      .catch((error) => {
        alert(`Reservation failed: ${error.message}`);
        // Handle any error or error notification here
      });
  };

  return (
    <div className="reserve-page">
      <div className="house-reserve-details">
        <p className="headline">
          On Home Stay ,We have range of huses/apartments from 1 BHK to 5 BHK equipped with every
          facility
        </p>
        <label htmlFor="select-house">
          <select
            className="select-house-option"
            id="select-house"
            value={selectedHouse}
            onChange={handleHouseChange}
          >
            <option value="">Select a house</option>
            {houses.map((house) => (
              <option key={house.id} value={house.id}>
                {house.name}
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
              {houses.map((house) => (
                <option key={house.id} value={house.title}>
                  {house.location}
                </option>
              ))}
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