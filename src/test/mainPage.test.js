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

// Create the Redux store with Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    house: houseSlice, // Add other reducers here if needed
  },
  preloadedState: initialState,
  middleware: [thunk], // Add other middlewares here if needed
});

// Test if the loading spinner is displayed when isLoading is true
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

// Test if the house items are rendered correctly when data is available
test('renders next arrow', async () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <MemoryRouter history={history}>
        <MainPage />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    const arrowElement = screen.queryByTestId('nxt-arrow');
    expect(arrowElement).toBeInTheDocument();
  });
});

test('renders prev arrow', async () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <MemoryRouter history={history}>
        <MainPage />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    const arrowElement = screen.queryByTestId('prev-arrow');
    expect(arrowElement).toBeInTheDocument();
  });
});

test('renders List items', async () => {
  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <MemoryRouter history={history}>
        <MainPage />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    const listItems = screen.getAllByTestId('listitem');
    expect(listItems).toHaveLength(2);
  });
});
