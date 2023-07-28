import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = 'https://house-rent-api.onrender.com/api/v1/houses';

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({ houseId, reservationDate, location }) => {
    try {
      const response = await axios.post(`${API_URL}/${houseId}/reservations`, {
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

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (houseId) => {
    try {
      const response = await axios.get(`${API_URL}/${houseId}/reservations`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
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
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservationSlice.reducer;
