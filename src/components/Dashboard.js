import React, { useState } from 'react';
import ModList from './ModList';
import ModForm from './AddModForm';

const Dashboard = ({ onLogout }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    onLogout();
  };

  const handleOpenModForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard</p>
      <ModList />
      <button onClick={handleOpenModForm}>{isFormOpen ? 'Close' : 'Add Mod'}</button>
      {isFormOpen && <ModForm handleOpenModForm={handleOpenModForm} />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
