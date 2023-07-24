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
  // console.log(house);
  if (!house) {
    return <div>House not found</div>;
  }

  const handleReserve = () => {
    // Navigate to ReservePage with the selected house data as state
    navigate(`/reserve/${house.id}`, { state: { house } });
  };

  return (
    <div className="house-details">
      <div class="image-section">
      <img className="dis-img" src={house.imageUrl} alt={house.title} />
      </div>
      <div className="house-info">
        <h3 className="house-title">House Title: {house.title}</h3>
        <p>House Decription: {house.description}</p>
        <p>Price: ${house.price}</p>
        <p>Type: {house.type}</p>
        <p>BHK: {house.BHK}</p>
        <p>AC: {house.AC}</p>
        <button className="btn-book" type="button" onClick={handleReserve}>
          Reserve
        </button>
         <button className="btn-book" type="button" onClick={() => navigate('/')}> &#8592;  Back  </button>
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
