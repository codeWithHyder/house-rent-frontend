import { configureStore } from '@reduxjs/toolkit';
import houseSlice from './feature/houseSlice';

export const store = configureStore({
  reducer: {
    house: houseSlice,
  },

});

export default store;
