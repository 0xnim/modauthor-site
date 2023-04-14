import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModMenu = ({ modObject, onCloseMenu }) => {
  const modId = modObject.modID;
  const [mod, setMod] = useState(null);
  const [editable, setEditable] = useState(false);
  const [modifiedMod, setModifiedMod] = useState(null);

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
      setModifiedMod(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [modId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModifiedMod({ ...modifiedMod, [name]: value });
  };

  const handleCancelClick = () => {
    setEditable(false);
    setModifiedMod(mod);
  };

  const handleSaveClick = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    axios.put(`${apiUrl}/mods/${modId}`, modifiedMod, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setMod(response.data);
      setModifiedMod(response.data);
      setEditable(false);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  if (!mod) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        name="modName"
        value={modifiedMod.modName}
        readOnly={!editable}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="modDescription"
        value={modifiedMod.modDescription}
        readOnly={!editable}
        onChange={handleInputChange}
      />
      {!editable ? (
        <button onClick={() => setEditable(true)}>Edit</button>
      ) : (
        <>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
      {!editable && <button onClick={onCloseMenu}>Close</button> }
    </div>
  );
};

export default ModMenu;
