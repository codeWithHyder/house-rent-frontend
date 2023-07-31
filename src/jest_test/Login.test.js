import { render, cleanup } from '@testing-library/react';
import Login from '../components/auth/Login';

afterEach(() => {
  cleanup();
});

describe('SignIn', () => {
  it('SignIn renders correctly', () => {
    const login = render(<Login />);
    expect(login).toMatchSnapshot();
  });
});
