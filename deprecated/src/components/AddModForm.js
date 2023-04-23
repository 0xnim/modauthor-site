import React, { useState } from 'react';
import axios from 'axios';



const AddModForm = () => { //{ onAddMod }
  const [modId, setModId] = useState('');
  const [modName, setModName] = useState('');
  const [modDescription, setModDescription] = useState('');
  const [modVersion, setModVersion] = useState('');
  const [modReleaseDate, setModReleaseDate] = useState('');
  const [modTags, setModTags] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddMod = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.post(`${apiUrl}/mods`, {
        modId,
        modName,
        modDescription,
        modVersion,
        modReleaseDate,
        modTags
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 201) {
        //onAddMod(response.data);
        alert('Mod added successfully!');
        setModId('');
        setModName('');
        setModDescription('');
        setModVersion('');
        setModReleaseDate('');
        setModTags('');
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

  return (
    <form onSubmit={handleAddMod}>
      <div className="form-group">
        <label htmlFor="modId">Mod ID:</label>
        <input type="text" id="modId" value={modId} onChange={(e) => setModId(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="modName">Mod Name:</label>
        <input type="text" id="modName" value={modName} onChange={(e) => setModName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="modDescription">Mod Description:</label>
        <textarea
          id="modDescription"
          value={modDescription}
          onChange={(e) => setModDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="modVersion">Mod Version:</label>
        <input type="text" id="modVersion" value={modVersion} onChange={(e) => setModVersion(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="modReleaseDate">Mod Release Date:</label>
        <input type="date" id="modReleaseDate" value={modReleaseDate} onChange={(e) => setModReleaseDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="modTags">Mod Tags:</label>
        <input type="text" id="modTags" value={modTags} onChange={(e) => setModTags(e.target.value)} />
      </div>
      <button type="submit">Add Mod</button>
    </form>
  );
};

export default AddModForm;
