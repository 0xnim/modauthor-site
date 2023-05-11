// React Component that is a Menu
// Uses the same menu for adding info to a new mod and updating info. 
// Using the endpoint /mods/:modId/info for POST, PUT and GET requests
// the json fields to be added or updated are: github, forum, donation


import React, { useState } from "react";
import axios from "axios";

const ModInfoForm = ( modIDInput ) => {
    const modID = modIDInput.modID;
    const [modId, setModId] = useState(modID);
    const [github, setGithub] = useState("");
    const [forum, setForum] = useState("");
    const [donation, setDonation] = useState("");
    
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if ModInfo exists for that mod
    // If it does, then GET the info and display it and allow editing
    
    // If it doesn't, then POST the info and display it

    
    const handleAddMod = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("accessToken");

        try {
        const response = await axios.post(
            `${apiUrl}/mods/${modId}/info`,
            {
            github,
            forum,
            donation,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
    
        if (response.status === 201) {
            alert("Mod info added successfully!");
            setModId("");
            setGithub("");
            setForum("");
            setDonation("");
        } else {
            console.error(response);
            alert("Failed to add mod info.");
        }
        } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized access");
            // handle unauthorized access here
        } else {
            console.error(error);
            alert("Failed to add mod info.");
        }
        }
    };
    
    return (
        <form onSubmit={handleAddMod}>
        <label htmlFor="github">Github</label>
        <input
            type="url"
            name="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
        />
        <label htmlFor="forum">Forum</label>
        <input
            type="url"
            name="forum"
            value={forum}
            onChange={(e) => setForum(e.target.value)}
        />
        <label htmlFor="donation">Donation</label>
        <input
            type="url"
            name="donation"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
        />
        <button type="submit">Add Mod Info</button>
        </form>
    );
}

export default ModInfoForm;

            