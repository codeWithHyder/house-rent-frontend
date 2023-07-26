import { configureStore } from '@reduxjs/toolkit';
import houseSlice from './feature/houseSlice';
// import addHouseSlice from './feature/addHouseSlice';

const store = configureStore({
  reducer: {
    house: houseSlice,
    // addHouse: addHouseSlice,
  },

});

export default store;
