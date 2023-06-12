import React, { useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Dialog = styled.dialog`
  position: fixed;
  top: 90%;
  left: 50%;  
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  padding: 20px;
  height: 85vh;
  heright: auto;
  background-color: #293646;
  border: 1px solid #1d2736;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AddModForm = () => {
  const dialogRef = useRef(null);
  const modIdRef = useRef(null);
  const modNameRef = useRef(null);
  const modDescriptionRef = useRef(null);
  const modVersionRef = useRef(null);
  const modReleaseDateRef = useRef(null);
  const [modTags, setModTags] = useState([]);
  const [customTag, setCustomTag] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOpenDialog = () => {
    dialogRef.current.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current.close();
  };

  const handleAddMod = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');

    console.log(modTags);

    try {
      const modTagsString = [...modTags, customTag].join(',');
      const response = await axios.post(
        `${apiUrl}/mods`,
        {
          modId: modIdRef.current.value,
          modName: modNameRef.current.value,
          modDescription: modDescriptionRef.current.value,
          modVersion: modVersionRef.current.value,
          modReleaseDate: modReleaseDateRef.current.value,
          modTags: modTagsString,
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
        setModTags([]);
        setCustomTag('');
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

  const handleModTagChange = (event) => {
    const tag = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setModTags((prevTags) => [...prevTags, tag]);
    } else {
      setModTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
    }
  };

  const handleCustomTagChange = (event) => {
    setCustomTag(event.target.value);
  };


  return (
    <>
      <button id="add-btn-1" onClick={handleOpenDialog}>Add Mod</button>

      <Dialog ref={dialogRef}>
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
            <div>
              <label className="checkbox-button">
                <input type="checkbox" name="modTags" value="mod" onChange={handleModTagChange} />
                Mod
              </label>
              <label className="checkbox-button">
                <input type="checkbox" name="modTags" value="part" onChange={handleModTagChange} />
                Part Pack
              </label>
              <label className="checkbox-button">
                <input type="checkbox" name="modTags" value="plugin" onChange={handleModTagChange} />
                Plugin
              </label>
              <div>
                <input type="text" name="customTag" value={customTag} onChange={handleCustomTagChange} />
                <button type="button" onClick={() => setModTags((prevTags) => [...prevTags, customTag])}>Add Tag</button>
                <br></br>
              </div>
            </div>
          </div>
          <br></br>
          <button type="submit">Add Mod</button>
        </form>
        <button type="button" onClick={handleCloseDialog}>Close</button>
      </Dialog>
    </>
  );
};

export default AddModForm;
