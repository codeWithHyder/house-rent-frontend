import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../../Redux/feature/reservationsSlice';
import { getHouses } from '../../Redux/feature/houseSlice';
import '../../styling/myreservation.css';

const MyReservation = () => {
  const user = useSelector((state) => state.auth.user);
  const house = useSelector((state) => state.house.houseData);
  const reservations = useSelector((state) => state.reservations.reservations);

  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // Check if reservations exist in local storage
    const savedReservations = JSON.parse(localStorage.getItem('reservations'));
    if (savedReservations && savedReservations.length > 0) {
      // If reservations are available in local storage, use them directly
      dispatch({ type: 'reservations/fetchReservations/fulfilled', payload: savedReservations });
      setDataFetched(true);
    } else if (user?.id && !dataFetched) {
      // Fetch reservations only if user.id is available and data has not been fetched yet
      dispatch(fetchReservations(user.id)) // Pass the user.id to fetchReservations
        .then((action) => {
          // Update local storage with the fetched reservations
          localStorage.setItem('reservations', JSON.stringify(action.payload));
        })
        .catch((error) => {
          console.error('Error fetching reservations:', error);
        });
      setDataFetched(true); // Set dataFetched to true to prevent multiple fetch calls
    }
    dispatch(getHouses()); // Fetch the list of houses if needed
  }, [dispatch, user, dataFetched]);

  return (
    <div className="center-container">
      <div className="text">
        <h2> My Reservation </h2>
        <p>Here You can Find All Your Booked Houses</p>
      </div>
      {reservations.length === 0 ? <div>No reservations found.</div> : null}

      {reservations.length > 0 && (
        <table className="reservation-table">
          <thead>
            <tr>
              <th className="green-column">House </th>
              <th className="green-column">City</th>
              <th className="green-column">Reservation Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{house.find((h) => h.id === reservation.house_id)?.name}</td>
                <td>{reservation.city}</td>
                <td>{reservation.reservation_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReservation;
