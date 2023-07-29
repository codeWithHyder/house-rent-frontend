import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://house-rent-api.onrender.com/api/v1/houses';

// Function to save reservations data to local storage
const saveReservationsToLocalStorage = (reservations) => {
  localStorage.setItem('reservations', JSON.stringify(reservations));
};

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({ houseId, reservationDate, location }) => {
    try {
      const response = await axios.post(`${baseURL}/${houseId}/reservations`, {
        reservation: {
          house_id: houseId,
          reservation_date: reservationDate,
          city: location,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
);

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (houseId) => {
  try {
    const response = await axios.get(`${baseURL}/${houseId}/reservations`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

function getReservationsFromLocalStorage() {
  const savedReservations = localStorage.getItem('reservations');
  return savedReservations ? JSON.parse(savedReservations) : [];
}

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    // eslint-disable-next-line max-len
    reservations: getReservationsFromLocalStorage(), // Get reservations from local storage if available
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reservations.push(action.payload);
        saveReservationsToLocalStorage(state.reservations); // Save reservations to local storage
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reservations = action.payload;
        saveReservationsToLocalStorage(state.reservations); // Save reservations to local storage
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservationSlice.reducer;
