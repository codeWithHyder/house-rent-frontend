import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const HouseDetails = ({ match }) => {
  const houseId = match.params.id;
  const house = useSelector((state) => state.houses.find((house) => house.id === houseId));

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
      <img src={house.imageUrl} alt={house.title} />
      <div className="house-info">
        <h3>{house.title}</h3>
        <p>{house.description}</p>
        <p>
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
        </p>
        <button type="button" onClick={handleBookHouse}>
          Book House
        </button>
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
