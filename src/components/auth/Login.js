import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/feature/UserSlice';
import '../../styling/Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  // const token = localStorage.getItem('token');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(login({ name, password }));
  };

  return (
    <section className="login-page">
      <div className="avatar-container">
        <MdSupervisedUserCircle />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h4 className="form-heading">Member Login</h4>
        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="UserName"
            value={name}
            onChange={(event) => setname(event.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
        </div>

        {loading ? (
          <button type="submit" className="login-button" disabled>
            Logging in...
          </button>
        ) : (
          <button type="submit" className="login-button">
            Login
          </button>
        )}
        <p>
          Create New Account,
          {' '}
          <Link to="/sign_up" style={{ textDecoration: 'none', color: ' white' }}>
            SignUp
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
