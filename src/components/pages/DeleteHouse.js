import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHouse } from '../../Redux/feature/houseSlice';

const DeleteHouse = () => {
  const houses = useSelector((store) => store.house.houseData);
  const dispatch = useDispatch();

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
            <button type="button" onClick={dispatch(deleteHouse(house.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default DeleteHouse;
