import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModMenu = ({ modId, onCloseMenu }) => {
  const [mod, setMod] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    axios.get(`${apiUrl}/mods/${modId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setMod(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [modId]);

  if (!mod) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{mod.modName}</h3>
      <p>{mod.modDescription}</p>
      <button onClick={onCloseMenu}>Close</button>
    </div>
  );
};

export default ModMenu;
