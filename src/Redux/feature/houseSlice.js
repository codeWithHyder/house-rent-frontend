import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  houseData: [],
  isLoading: true,
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
});

// console.log(cartSlice);

export default houseSlice.reducer;
