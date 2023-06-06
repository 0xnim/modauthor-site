import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ModMenu.css';
import VersionList from './VersionList';

import ModInfoForm from './SocialMenu';

const ModMenu = ({ modObject, onCloseMenu }) => {
  const modId = modObject.modID;
  const [mod, setMod] = useState(null);
  const [editable, setEditable] = useState(false);
  const [modifiedMod, setModifiedMod] = useState(null);
  const [isVersionsOpen, setIsVersionsOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const dialogRef = useRef(null);

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

  const handleVersionsButton = () => {
    setIsVersionsOpen(!isVersionsOpen);
  };

  const handleDeleteMod = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    axios.delete(`${apiUrl}/mods/${modId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      onCloseMenu();
    })
    .catch((error) => {
      console.error(error);
    });
  };


  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };  
  

  if (!mod) {
    return <div>Loading...</div>;
  }

  return (
    <div class="mod-menu">
      <div>
        <label for="modName">Name:</label>
        <input
          type="text"
          name="modName"
          value={modifiedMod.modName}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <label for="modDescription">Description:</label>
        <input
          type="text"
          name="modDescription"
          value={modifiedMod.modDescription}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <label for="modVersion">Version:</label>
        <input
          type="text"
          name="modVersion"
          value={modifiedMod.modVersion}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <label for="modImage">Image:</label>
        <input
          type="text"
          name="modImage"
          value={modifiedMod.modImage}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <label for="modTags">Tags:</label>
        <input
          type="text"
          name="modTags"
          value={modifiedMod.modTags}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <div class="tag-instructions">Separate by commas</div>
      </div>
      
      {!editable ? (
        <>
          <button onClick={() => setEditable(true)}>Edit</button>
          <button onClick={openDialog}>Delete</button>
          <dialog ref={dialogRef} className="delete dialog">
            <h2>Delete</h2>
            <p>
              Are you sure you want to delete this version? This action cannot be undone.
            </p>
            <button type="button" onClick={() => handleDeleteMod(modId)} class="confirm">Confirm</button>
            <button onClick={closeDialog}>Cancel</button>
          </dialog>
          <ModInfoForm modID={modId}/>
          
          <br></br>
          <button onClick={handleVersionsButton}>Versions</button>
          <br></br>
          <button onClick={onCloseMenu}>Close</button>
        </>
      ) : (
        <>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSaveClick}>Save</button>
        </>
      )}
      {isVersionsOpen && (
        <VersionList modID={modId}/>
      )}
    </div>
  );
};

export default ModMenu;
