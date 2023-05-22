import React, { useState } from 'react';
import axios from 'axios';
import './AddVersion.css';

const AddVersion = ({ modIDInput, onCloseMenu }) => {
    const modID = modIDInput;
    const [modId, setModId] = useState(modID);
    const [versionNumber, setVersionNumber] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [changelog, setChangelog] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleAddVersion = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');

        try {
            const response = await axios.post(`${apiUrl}/mods/${modId}/versions`, {
                modId,
                versionNumber,
                releaseDate,
                changelog
            }, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setModId('');
                setVersionNumber('');
                setReleaseDate('');
                setChangelog('');
                alert('Version added successfully!');
                onCloseMenu();
            } else {
                console.error(response);
                alert('Failed to add version.');
                onCloseMenu();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized access');
                // handle unauthorized access here
            } else {
                console.error(error);
                alert('Failed to add version.');
            }
        }
    };




    return (
        <div>
            <div className="form-control" class="form-control">
                <form onSubmit={handleAddVersion}>
                    <label htmlFor="modId">Mod ID</label>
                    <input
                        type="text" id="modId" value={modId} onChange={(e) => setModId(e.target.value)} readOnly />
                    <label htmlFor="versionNumber">Version</label>
                    <input
                        type="text" id="versionNumber" value={versionNumber} onChange={(e) => setVersionNumber(e.target.value)} required />
                    <p>Use 'latest' to have it always pull that version.</p>
                    <label htmlFor="releaseDate">Release Date</label>
                    <input
                        type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                    <label htmlFor="changelog">Changelog</label>
                    <input
                        type="text" id="changelog" value={changelog} onChange={(e) => setChangelog(e.target.value)} />
                    <button className="btn btn-primary" onClick={console.log("")}>Add Version</button>
                </form>
                <button onClick={() => onCloseMenu()}>Close</button>
            </div>
        </div>
    );
};

export default AddVersion;