import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHouse, getHouses } from '../../Redux/feature/houseSlice';

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
    <div>
      <ul>
        {houses.map((house) => (
          <li key={house.id}>
            <img src={house.image_url} alt={house.name} />
            Name:
            {' '}
            {house.name}
            price:
            {' '}
            {house.rental_fee}
            <button type="button" onClick={() => handleDeleteHouse(house.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteHouse;
