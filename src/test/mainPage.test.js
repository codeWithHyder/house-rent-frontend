import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../components/pages/Mainpage';
import houseSlice from '../Redux/feature/houseSlice';

const initialState = {
    house: {
      houseData: [
        {
          id: 1,
          category: 'Category 1',
          description: 'Description 1',
          image_url: 'url1',
        },
        {
          id: 2,
          category: 'Category 2',
          description: 'Description 2',
          image_url: 'url2',
        },
        // Add more test data as needed
      ],
      isLoading: false,
    },
};
  
  