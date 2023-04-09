import React from 'react';
import ModList from './ModList';

const Dashboard = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    onLogout();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard</p>
      <ModList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
