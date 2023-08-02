import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/auth/Register';
import store from '../Redux/store';

jest.mock('../Redux/feature/regestrationSlice.js', () => ({
  signUp: jest.fn(),
}));

describe('Register', () => {
  it('submits the registration form successfully', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('example@gmail.com');
    const fullNameInput = getByPlaceholderText('UserName');
    const passwordInput = getByPlaceholderText('Password');

    // Fill in the form inputs
    fireEvent.change(emailInput, { target: { value: 'Hisoka@example.com' } });
    fireEvent.change(fullNameInput, { target: { value: 'Hisoka37' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
  });
});
