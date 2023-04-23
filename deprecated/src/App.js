import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    setShowLogin(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedIn(false);
    setShowLogin(true);
  }

  const handleSwitchToRegister = () => {
    setShowLogin(false);
  }

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : showLogin ? (
        <>
          <Login onLogin={handleLogin} />
          <button class="btn-sm" type="button" onClick={handleSwitchToRegister}>Register</button>
        </>
      ) : (
        <>
          <Register onRegister={handleLogin} />
          <div className="register-switch-link">
            Already have an account? <button class="btn-sm" type="button" onClick={handleSwitchToLogin}>Login</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
