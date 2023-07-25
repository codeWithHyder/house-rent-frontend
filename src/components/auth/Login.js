import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/feature/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token && isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }, [isLoggedIn, token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <section>
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <h4>Member Login</h4>
        <div>
          <input
            type="email"
            placeholder="Useremail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        <Link to="/">
          <button type="submit">Login</button>
          <button type="button" aria-label="Go back">
            Back
          </button>
        </Link>
      </form>
      <p>
        New here?
        {' '}
        <Link to="/" style={{ textDecoration: 'none' }}>
          Register
        </Link>
      </p>
    </section>

  );
};

export default Login;
