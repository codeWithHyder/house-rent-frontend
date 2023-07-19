// src/store/index.js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
