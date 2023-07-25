/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setHouses } from '../../Redux/feature/houseSlice';

const HouseDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const detailData = useSelector((state) => state.house.houseData);
  const { id } = useParams();
  const house = detailData.find((house) => house.id === parseInt(id, 10));

  useEffect(() => {
    const fetchHousesData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/houses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        dispatch(setHouses(data));
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching house data:', error);
        setIsLoading(false); // Set loading to false if there is an error
      }
    };

    fetchHousesData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (!house) {
    return <div>House not found</div>;
  }

  const handleReserve = () => {
    // Navigate to ReservePage with the selected house data as state
    navigate(`/reserve/${house.id}`, { state: { house } });
  };

  return (
    <div className="house-details">
      <div className="image-section">
        <img className="dis-img" src={house.image_url} alt={house.name} />
      </div>
      <div className="house-info">
        <h3 className="house-dtls">Title: {house.name}</h3>
        <p className="house-dtls">House ID: {house.id}</p>
        <p className="house-dtls">House Description: {house.description}</p>
        <p className="house-dtls"> Rental Price: ${house.rental_fee}</p>
        <p className="house-dtls">Type: {house.category}</p>
        <p className="house-dtls">Location: {house.location}</p>
        <p className="house-dtls">Date Built: {house.date_built}</p>
        <button className="btn-book" type="button" onClick={handleReserve}>
          Reserve
        </button>
        <button className="btn-book" type="button" onClick={() => navigate('/')}>
          &#8592; Back
        </button>
      </div>
    </div>
  );
};

export default HouseDetails;
