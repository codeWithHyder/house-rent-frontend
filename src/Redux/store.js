import { configureStore } from '@reduxjs/toolkit';
import houseSlice from './feature/houseSlice';
import authReducer from './feature/UserSlice';
import signUpReducer from './feature/regestrationSlice';

const store = configureStore({
  reducer: {
    house: houseSlice,
    auth: authReducer,
    register: signUpReducer,
  },

});

export default store;
