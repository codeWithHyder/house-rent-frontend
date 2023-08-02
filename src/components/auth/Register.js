import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
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
    dispatch(
      signUp({
        name,
        email,
        password,
      }),
    );
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
    <section className="login-page">
      <h3 className="welcome-text">Welcome</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <h4 className="form-heading">Register</h4>
        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="UserName"
          />
        </div>
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Register
          {' '}
        </button>
        <p>
          Already have an account?
          {' '}
          <Link to="/sign_in" style={{ textDecoration: 'none', color: ' white' }}>
            SignIn
          </Link>
        </p>
      </form>
      {renderMessage()}
    </section>
  );
};

export default Register;
