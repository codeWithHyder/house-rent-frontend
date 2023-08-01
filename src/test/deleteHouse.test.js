import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom'; 
import DeleteHouse from '../components/pages/DeleteHouse';
import houseReducer from '../Redux/feature/houseSlice';

const renderWithRedux = (
  ui,
  { initialState, store = configureStore({ reducer: houseReducer, preloadedState: initialState }) } = {},
) => ({
  ...render(
    <Provider store={store}>
      <MemoryRouter>
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

  // Ensure the delete-nav elements are rendered
  it('delete-nav elements are rendered', () =>{
    expect(screen.getByText('Delete a house')).toBeInTheDocument();
    expect(screen.getByTestId('fa-arrow-left')).toBeInTheDocument();
  });

  // Ensure the delete-house-container elements are rendered
  it('delete-house-container elements are rendered', () =>{
    expect(screen.getByTestId('delete-house-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('delete-house-item')).toHaveLength(2);
  });
      
  // Ensure the delete button is rendered
  it('delete button is rendered', () =>{
    expect(screen.getAllByTestId('delete-button')).toHaveLength(2);
    expect(screen.getAllByTestId('delete-button')[0]).toHaveTextContent('Delete');
    expect(screen.getAllByTestId('delete-button')[1]).toHaveTextContent('Delete');
  });    
});
