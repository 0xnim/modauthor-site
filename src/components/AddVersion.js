import React, { useState } from 'react';
import axios from 'axios';

const AddVersion = () => {
    const [modId, setModId] = useState('');
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

            if (response.status === 201) {
                
                setModId('');
                setVersionNumber('');
                setReleaseDate('');
                setChangelog('');
                alert('Version added successfully!');
            } else {
                console.error(response);
                alert('Failed to add version.');
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
            <form onSubmit={handleAddVersion}>
                <div className="form-control">
                    <label htmlFor="modId">Mod ID</label>
                    <input
                        type="text" id="modId" value={modId} onChange={(e) => setModId(e.target.value)} required />

        </div>
    );

};

export default AddVersion;