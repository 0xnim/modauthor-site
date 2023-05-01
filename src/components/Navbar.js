import React, { useState } from 'react';
import ModList from './ModList';
import ModForm from './AddModForm';
//import ModMenu from './ModMenu';
import './Dashboard.css';

const Navbar = ({ onLogout }) => {
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

       </div>    
    </div>
  );
};

export default Navbar;
