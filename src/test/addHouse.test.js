import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import AddHouse from '../components/pages/AddHouse';
import houseReducer from '../Redux/feature/houseSlice';

// Mock Redux store
const renderWithRedux = (
    ui,
    { initialState, store = configureStore({ reducer: { house: houseReducer }, preloadedState: initialState }) } = {},
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

describe('AddHouse Component', () => {
    it('should render correctly', () => {
      renderWithRedux(<AddHouse />);
  
      // Check if the header is rendered
      const headerElement = screen.getByText(/Add House/i);
      expect(headerElement).toBeInTheDocument();
  
      // Check if the input elements are rendered
      const inputElements = screen.getAllByRole('textbox');
      expect(inputElements).toHaveLength(5);
    });

    
});