import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import DeleteHouse from '../components/pages/DeleteHouse';
import houseReducer from '../Redux/feature/houseSlice';

const renderWithRedux = (
  ui,
  { initialState, store = configureStore({ reducer: houseReducer, preloadedState: initialState }) } = {},
) => ({
  ...render(
    <Provider store={store}>
      <MemoryRouter> {/* Wrap the component with MemoryRouter */}
        {ui}
      </MemoryRouter>
    </Provider>
  ),
  store,
});

describe('DeleteHouse component', () => {

  let mockHousesData;
  let container;

  beforeEach(() => {
    mockHousesData = [
      {
        id: 1,
        name: 'House A',
        rental_fee: 1000,
        location: 'City X',
        image_url: 'image-url-1',
      },
      {
        id: 2,
        name: 'House B',
        rental_fee: 1500,
        location: 'City Y',
        image_url: 'image-url-2',
      },
    ];

    ({ container } = renderWithRedux(<DeleteHouse />, {
      initialState: {
        house: {
          houseData: mockHousesData,
        },
      },
    }));
  });
  
    // Ensure the component is rendered properly
    it('should render correctly with houses data', () => {
      expect(container).toBeInTheDocument();
    });
    
});
