// Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform further actions based on the logged-in user
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
