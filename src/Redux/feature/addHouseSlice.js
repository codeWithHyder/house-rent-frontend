/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/api/v1/houses';

export const addHouse = createAsyncThunk('houses/addHouse', async (newHouseData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHouseData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  houses: [],
  isLoading: false,
  error: '',
};

const addHouseSlice = createSlice({
  name: 'addHouses',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addHouse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addHouse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.houses.push(action.payload);
    });
    builder.addCase(addHouse.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },

});

export default addHouseSlice.reducer;
