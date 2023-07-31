import { render, cleanup } from '@testing-library/react';
import Login from '../components/auth/Login.js';

afterEach(() => {
  cleanup();
});

describe('SignIn', () => {
  it('SignIn renders correctly', () => {
    const signin = render(<Login />);
    expect(signin).toMatchSnapshot();
  });
});
