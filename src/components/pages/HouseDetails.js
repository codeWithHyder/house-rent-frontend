/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useNavigate  } from 'react-router-dom';
// import MainPage from './Mainpage';

const HouseDetails = () => {
  // const houseId = match.params.id;
  const navigate = useNavigate();
  const detailData = useSelector((state) => state.house.houseData);
  const { id } = useParams();
  const house = detailData.find((house) => house.id === parseInt(id, 10));
  console.log(house);
  if (!house) {
    return <div>House not found</div>;
  }

  const handleBookHouse = () => {
    // Implement your booking logic here
    // You can store booking information in Redux or send it to the server
    // console.log('Booking house:', house);
  };

  return (
    <div className="house-details">
      <div class="image-section">
      <img className="dis-img" src={house.imageUrl} alt={house.title} />
      </div>
      <div className="house-info">
        <h3 className="house-title">{house.title}</h3>
        <p>{house.description}</p>
        {/* <p>
          Number of days stay:
          {house.numDaysStay}
        </p>
        <p>
          Rate per day:
          {house.ratePerDay}
        </p>
        <p>
          Total amount due:
          {house.numDaysStay * house.ratePerDay}
        </p> */}
        <button className="btn-book" type="button" onClick={handleBookHouse}>
          Book House
        </button>
         <button className="btn-book" type="button" onClick={() => navigate('/')}> Back to Main </button>
      </div>
    </div>
  );
};

HouseDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HouseDetails;
