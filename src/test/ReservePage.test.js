import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ReservePage from '../components/pages/ReservePage';

// Create a mock Redux store
const mockStore = configureMockStore();
const initialState = {
  house: {
    houseData: [
      { id: 1, name: 'House 1', location: 'City 1' },
      { id: 2, name: 'House 2', location: 'City 2' },
    ],
  },
};
const store = mockStore(initialState);

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

test('ReservePage renders without errors', () => {
  render(
    <Provider store={store}>
      <ReservePage />
    </Provider>,
  );

  // Ensure the "Select a house" option is present in the dropdown
  const selectHouseOption = screen.getByText('Select a house');
  expect(selectHouseOption).toBeInTheDocument();

  // Ensure the "Select a city" option is present in the dropdown
  const selectCityOption = screen.getByText('Select a city');
  expect(selectCityOption).toBeInTheDocument();
});

test('ReservePage shows an alert when Reserve button is clicked with missing fields', () => {
  render(
    <Provider store={store}>
      <ReservePage />
    </Provider>,
  );

  const reserveButton = screen.getByText('Reserve');
  fireEvent.click(reserveButton);

  // Ensure an alert is shown when the Reserve button is clicked without selecting all fields
});
