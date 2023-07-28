import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteHouse, getHouses } from '../../Redux/feature/houseSlice';
import '../styles/deletehouse.css';

const DeleteHouse = () => {
  const houses = useSelector((store) => store.house.houseData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHouses());
  }, []);

  const handleDeleteHouse = (id) => {
    dispatch(deleteHouse(id));
  };

  return (
    <div className="delete-house">
      <div className="delete-nav">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="fa-arrow-left" />
        </Link>
        <h1>Delete a house</h1>
      </div>

      <ul className="delete-house-container">
        {houses.map((house) => (
          <li key={house.id} className="delete-house-items">
            <img src={house.image_url} alt={house.name} />
            <div className="delete-items-details">
              Name:
              {' '}
              {house.name}
              <br />
              Price:
              {' '}
              {house.rental_fee}
              <br />
              Location:
              {' '}
              {house.location}
            </div>
            <button type="button" onClick={() => handleDeleteHouse(house.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteHouse;
