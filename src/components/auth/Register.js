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
    

  );
};

export default Register;
