import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../../Redux/feature/reservationsSlice';
import '../../styling/myreservation.css';

const MyReservation = () => {
  const houses = JSON.parse(localStorage.getItem('houses'));
  const reservations = useSelector((state) => state.reservations.reservations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="center-container">
        <div className="text">
          <h1 className="title"> My Reservations </h1>
          <p className="desc">Here You can Find All Your Booked Houses</p>
        </div>
        {reservations.length === 0 ? <div>No reservations found.</div> : null}

        {reservations.length > 0 && houses && (
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
                  <td>{houses.find((h) => h.id === reservation.house_id)?.name}</td>
                  <td>{reservation.city}</td>
                  <td>{formatDate(reservation.reservation_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link to="/">
        <button type="button" className="back-btn">
          &#8592;
        </button>
      </Link>
    </>
  );
};

export default MyReservation;
