/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  try {
    const response = await axios.get('https://house-rent-api.onrender.com/api/v1/houses');
    localStorage.setItem('houses', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addHouseApi = createAsyncThunk('houses/addHouse', async (newHouseData) => {
  const user_id = JSON.parse(localStorage.getItem('user')).id;
  try {
    const response = await axios.post(
      `https://house-rent-api.onrender.com/api/v1/houses?user_id=${user_id}`,
      newHouseData,
    );
    localStorage.setItem('houses', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteHouse = createAsyncThunk('house/deleteHouse', async (id) => {
  const user_id = JSON.parse(localStorage.getItem('user')).id;
  try {
    await axios.delete(
      `https://house-rent-api.onrender.com/api/v1/houses/${id}?user_id=${user_id}`,
    );
    return id;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  houseData: [],
  isLoading: false,
  error: null,
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    addHouse: (state, { payload }) => {
      state.houseData.push({
        name: payload.name,
        location: payload.location,
        rental_fee: payload.rental_fee,
        date_built: payload.date_built,
        category: payload.category,
        image_url: payload.image_url,
        description: payload.description,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.houseData = action.payload;
      }),
      builder.addCase(getHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(addHouseApi.pending, (state) => ({
      ...state,
      error: false,
    }));
    builder.addCase(addHouseApi.fulfilled, (state) => ({
      ...state,
      error: false,
    }));
    builder.addCase(addHouseApi.rejected, (state) => ({
      ...state,
      error: true,
    }));
    builder.addCase(deleteHouse.pending, (state) => ({
      ...state,
      success: false,
    }));
    builder.addCase(deleteHouse.fulfilled, (state, action) => {
      const deletedHouseId = action.payload;
      const filteredHouses = state.houseData.filter((item) => item.id !== deletedHouseId);
      localStorage.setItem('houses', JSON.stringify(filteredHouses));
      return {
        ...state,
        houseData: filteredHouses,
        success: true,
      };
    });
    builder.addCase(deleteHouse.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { addHouse, setHouses } = houseSlice.actions;
export default houseSlice.reducer;
