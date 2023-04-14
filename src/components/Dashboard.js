import React, { useState } from 'react';
import ModList from './ModList';
import ModForm from './AddModForm';
//import ModMenu from './ModMenu';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <div className="dashboard-no-mod-list-container">
        <h2>Dashboard</h2>
        <p>Welcome to your dashboard</p>
      </div>
      <ModList />
      <div className="dashboard-no-mod-list-container">
        <button onClick={handleOpenModForm}>{isFormOpen ? 'Close' : 'Add Mod'}</button>
        {isFormOpen && <ModForm />}
        <div class="logout">
          <button onClick={handleLogout}>Logout</button> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
