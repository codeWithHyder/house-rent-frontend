import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../Redux/feature/regestrationSlice';

/* eslint-disable camelcase */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state) => state.register) || {};
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({
      name,
      email,
      password,
    }));
    setIsSignedUp(true);
  };

  const renderMessage = () => {
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'failed') {
      return (
        <p>
          There was an error:
          {error}
        </p>
      );
    }

    if (status === 'succeeded') {
      return <p>Sign up successful!</p>;
    }
    return null;
  };

  useEffect(() => {
    if (isSignedUp) {
      setTimeout(() => {
        navigate('/sign_in');
        setIsSignedUp(false);
      }, 100);
    }
  }, [isSignedUp, navigate]);

  return (
    <section>
      <h3>Welcome</h3>
      <form onSubmit={handleSubmit}>
        <h4>Register</h4>
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?
        {' '}
        <Link to="/sign_in" style={{ textDecoration: 'none' }}>
          sign_in
        </Link>
      </p>
      {renderMessage()}
    </section>

  );
};

export default Register;
