import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/register`, { username, password, code });
      if (response.status === 201) {
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        onRegister();
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-heading">Register Page</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="code">Registration Code:</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="register-switch-link">
        Already have an account? <button type="button" onClick={onSwitchToLogin}>Login here</button>
      </div>
    </div>
  );
};

export default Register;
