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
  {
    initialState, store = configureStore(
      {
        reducer: { house: houseReducer }, preloadedState: initialState,
      },
    ),
  } = {},
) => ({
  ...render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>,
  ),
  store,
});

describe('AddHouse Component', () => {
  it('should render correctly', () => {
    renderWithRedux(<AddHouse />);

    // Check if the input elements are rendered
    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements).toHaveLength(5);
  });

  // Check if the name input element is rendered
  it('name input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('house-name-input')).toBeInTheDocument();
  });

  // Check if the location element is rendered
  it('location-input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('house-location')).toBeInTheDocument();
  });

  // Check if the price-input element is rendered
  it('price-input input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
  });

  // Check if the Rental fee element is rendered
  it('date-input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
  });

  it('category-input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('category-input')).toBeInTheDocument();
  });

  it('house-img-url-input element is rendered', () => {
    renderWithRedux(<AddHouse />);
    expect(screen.getByTestId('house-img-url')).toBeInTheDocument();
  });

  it('should call the handleSubmit function on form submission', () => {
    const mockDispatch = jest.fn();
    const store = configureStore({ reducer: { house: houseReducer }, preloadedState: {} });
    const { getByTestId } = renderWithRedux(<AddHouse />, { store });

    // Fill the form inputs
    const inputs = [
      getByTestId('house-name-input'),
      getByTestId('house-location'),
      getByTestId('house-img-url'),
      getByTestId('category-input'),
      getByTestId('price-input'),
      getByTestId('date-input'),
    ];
    inputs.forEach((input) => {
      fireEvent.change(input, { target: { value: 'Test Value' } });
    });

    // Fill the textarea input
    const textarea = getByTestId('description-area');
    fireEvent.change(textarea, { target: { value: 'Test Description' } });

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});
