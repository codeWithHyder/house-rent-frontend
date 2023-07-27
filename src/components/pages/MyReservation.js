import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../../Redux/feature/reservationsSlice';
import { getHouses } from '../../Redux/feature/houseSlice';

const MyReservation = () => {
  const user = useSelector((state) => state.auth.user);
  const house = useSelector((state) => state.house.houseData);
  const reservations = useSelector((state) => state.reservations.reservations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations(user.id)); // Pass the user.id to fetchReservations
    dispatch(getHouses()); // Fetch the list of houses if needed
  }, [dispatch, user.id]);

  return (
    <div>
      <h2> My Reservation </h2>
      {/* Handle loading and error states here */}
      {/* Show a message if there are no reservations */}
      {reservations.length === 0 ? <div>No reservations found.</div> : null}

      {reservations.map((reservation) => (
        <div key={reservation.id}>
          <h3>
            Reservation ID:
            {' '}
            {reservation.id}
          </h3>
          <p>
            House Name:
            {' '}
            {house.find((h) => h.id === reservation.house_id)?.name}
          </p>
          <p>
            Reservation Date:
            {' '}
            {reservation.reservation_date}
          </p>
          <p>
            City:
            {' '}
            {reservation.city}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyReservation;
