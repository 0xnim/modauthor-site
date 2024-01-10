import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { UserButton, useAuth, useSession } from "@clerk/clerk-react";
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

import ModForm from "./AddModForm";
import ModList from "./ModList";

const Dashboard = ({ onLogout }) => {
  const apiURL = process.env.REACT_APP_API_URL;
  toast.warning('Limited functionality! If mods are not showing up contact support@astromods.xyz', {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: 2,
  });

  const handleFunctionalityNotWorking = () => {
  // Code to handle functionality not working
  toast.warning('Limited functionality! If mods are not showing up contact support@astromods.xyz', {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: 2,
  });
}

  const { session } = useSession();

  useEffect(() => {
    handleFunctionalityNotWorking();
    session.getToken().then((sessionToken) => {
      localStorage.setItem("accessToken", sessionToken); 
      
    });
  }, [session]);

  const [navbarOpen, setNavbarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <div class="container">
        <button onClick={() => setNavbarOpen(!navbarOpen)} class="open">
          Open Nav
        </button>
        {navbarOpen && (
          <nav class="navbar">
            <button onClick={() => setNavbarOpen(!navbarOpen)}>X</button>

            <div class="nav-icon">
              <img src="/logo512.png"></img>
            </div>
            <ul class="nav-links">
              <li>
                <a href="/">Dashboard</a>
              </li>
              <li>
                <a href="https://astromods.xyz">Mods</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
            </ul>
            <div class="clerk-profile-icon">
              <UserButton />
            </div>
          </nav>
        )}
        <ModList />
        <div className="dashboard-no-mod-list-container">
          <ModForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
