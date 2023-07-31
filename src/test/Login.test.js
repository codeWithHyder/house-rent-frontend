import { render, cleanup } from '@testing-library/react';
import Login from '../components/auth/Login';

afterEach(() => {
  cleanup();
});

describe('Login', () => {
  it('SignIn renders correctly', () => {
    const signin = render(<Login />);
    expect(signin).toMatchSnapshot();
  });
});
