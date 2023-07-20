// src/store/actions.js
export const SET_HOUSES = 'SET_HOUSES';

export const setHouses = (houses) => ({
  type: SET_HOUSES,
  payload: houses,
});
