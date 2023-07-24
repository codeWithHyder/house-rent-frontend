import { configureStore } from '@reduxjs/toolkit';
import houseSlice from './feature/houseSlice';

const store = configureStore({
  reducer: {
    house: houseSlice,
  },

});

export default store;
