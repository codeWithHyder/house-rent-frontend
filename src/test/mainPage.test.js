import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
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

test('renders loading spinner when data is loading', () => {
  const loadingState = {
    house: {
      ...initialState.house,
      isLoading: true,
    },
  };
  const loadingStore = configureStore({
    reducer: {
      house: houseSlice,
    },
    preloadedState: loadingState,
    middleware: [thunk],
  });

  render(
    <Provider store={loadingStore}>
      <MainPage />
    </Provider>,
  );

  const loadingElement = screen.getByText('Loading...');
  expect(loadingElement).toBeInTheDocument();
});
