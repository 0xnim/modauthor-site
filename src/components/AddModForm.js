import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';

const Dialog = styled.dialog`
  // dialog styles...
`;

const AddModForm = () => {
  const dialogRef = useRef(null);
  const modIdRef = useRef(null);
  const modNameRef = useRef(null);
  const modDescriptionRef = useRef(null);
  const modVersionRef = useRef(null);
  const modReleaseDateRef = useRef(null);
  const modTagsRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const [decodedToken, setDecodedToken] = useState(null);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  const handleOpenDialog = () => {
    dialogRef.current.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current.close();
  };

  const handleAddMod = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        `${apiUrl}/mods`,
        {
          modId: modIdRef.current.value,
          modName: modNameRef.current.value,
          modDescription: modDescriptionRef.current.value,
          modVersion: modVersionRef.current.value,
          modReleaseDate: modReleaseDateRef.current.value,
          modTags: modTagsRef.current.value,
          owner: owner // Include the owner value in the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Mod added successfully!');
        modIdRef.current.value = '';
        modNameRef.current.value = '';
        modDescriptionRef.current.value = '';
        modVersionRef.current.value = '';
        modReleaseDateRef.current.value = '';
        modTagsRef.current.value = '';
        handleCloseDialog();
      } else {
        console.error(response);
        alert('Failed to add mod.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access');
        // handle unauthorized access here
      } else {
        console.error(error);
        alert('Failed to add mod.');
      }
    }
  };

  const handleOwnerSelect = (value) => {
    setOwner(value);
  };

  return (
    <>
      <button id="add-btn-1" onClick={handleOpenDialog}>Add Mod</button>

      <dialog ref={dialogRef}>
        <form onSubmit={handleAddMod}>
          <div className="form-group">
            <label htmlFor="modId">Mod ID:</label>
            <input type="text" id="modId" ref={modIdRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="modName">Mod Name:</label>
            <input type="text" id="modName" ref={modNameRef} required />
          </div>
          <div className="form-group">
            <label htmlFor="modDescription">Mod Description:</label>
            <textarea id="modDescription" ref={modDescriptionRef}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="modVersion">Mod Version:</label>
            <input type="text" id="modVersion" ref={modVersionRef} />
          </div>
          <div className="form-group">
            <label htmlFor="modReleaseDate">Mod Release Date:</label>
            <input type="date" id="modReleaseDate" ref={modReleaseDateRef} />
          </div>
          <div className="form-group">
            <label htmlFor="modTags">Mod Tags:</label>
            <input type="text" id="modTags" ref={modTagsRef} />
          </div>
          {decodedToken && decodedToken.org_slug && (
            <div className="form-group">
              <label htmlFor="owner">Owner:</label>
              <div>
                <button
                  type="button"
                  onClick={() => handleOwnerSelect('me')}
                  className={owner === 'me' ? 'active' : ''}
                >
                  Me
                </button>
                <button
                  type="button"
                  onClick={() => handleOwnerSelect(decodedToken.org_slug)}
                  className={owner === decodedToken.org_slug ? 'active' : ''}
                >
                  {decodedToken.org_slug}
                </button>
              </div>
            </div>
          )}
          <button type="submit">Add Mod</button>
          <button onClick={handleCloseDialog}>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default AddModForm;
