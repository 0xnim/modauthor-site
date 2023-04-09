import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${apiUrl}/auth`, { username, password });
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      onLogin();
    } catch (error) {
      console.error(error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-heading">Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;