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
      <div class="container">
        <nav class="navbar">
          <div class="nav-icon">
            <img src="logo512.png"></img>
          </div>
          <ul class="nav-links">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/mods">Mods</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
          <div class="logout">
           <button onClick={handleLogout}>Logout</button> 
          </div>
        </nav>
      </div>
        <div class="content">
          <div className="dashboard-no-mod-list-container">
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard</p>
          </div>
          <ModList />
          <div className="dashboard-no-mod-list-container">
            <button class="add" onClick={handleOpenModForm}>{isFormOpen ? 'Close' : 'Add Mod'}</button>
            {isFormOpen && <ModForm />}
          </div>
       </div>    
    </div>
  );
};

export default Dashboard;
