import React, { useState } from 'react';
import ModList from './ModList';
import ModForm from './AddModForm';
import ModMenu from './ModMenu';

const Dashboard = ({ onLogout }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMod, setSelectedMod] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    onLogout();
  };

  const handleOpenModForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSelectMod = (mod) => {
    setSelectedMod(mod);
  };

  const handleCloseMenu = () => {
    setSelectedMod(null);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard</p>
      <ModList onSelectMod={handleSelectMod} />
      <button onClick={handleOpenModForm}>{isFormOpen ? 'Close' : 'Add Mod'}</button>
      {isFormOpen && <ModForm />}
      <button onClick={handleLogout}>Logout</button>
      {selectedMod && <ModMenu modId={selectedMod} onCloseMenu={handleCloseMenu} />}
    </div>
  );
};

export default Dashboard;
