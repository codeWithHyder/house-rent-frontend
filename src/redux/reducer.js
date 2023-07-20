// src/store/reducer.js
import { SET_HOUSES } from './actions';

const initialState = {
  houses: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
