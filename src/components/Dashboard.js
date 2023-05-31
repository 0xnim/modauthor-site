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
  const notify = () => toast.info('If you want to sponsor and have your mod appear at the top of the list, contact me! contact.urlou@passfwd.com', {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    toastId: 1,
  });

  const { session } = useSession();

  useEffect(() => {
    notify();
    session.getToken().then((sessionToken) => {
      localStorage.setItem("accessToken", sessionToken); 
      
    });
  }, [session]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(true);


  const handleOpenModForm = () => {
    setIsFormOpen(!isFormOpen);
  };

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
              <li>
                <a onClick={notify} href="#">Sponsor</a>
              </li>
              <li>
                <ToastContainer />
              </li>
            </ul>
            <div class="clerk-profile-icon">
              <UserButton />
            </div>
          </nav>
        )}
        <ModList />
        <div className="dashboard-no-mod-list-container">
          <button class="add" onClick={handleOpenModForm}>
            {isFormOpen ? "Close" : "Add Mod"}
          </button>
          {isFormOpen && <ModForm />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;