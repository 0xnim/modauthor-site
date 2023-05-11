// React Component that is a Menu
// Uses the same menu for adding info to a new mod and updating info. 
// Using the endpoint /mods/:modId/info for POST, PUT and GET requests
// the json fields to be added or updated are: github, forum, donation


import React, { useState, useEffect } from "react";
import axios from "axios";

const ModInfoForm = ( modIDInput ) => {
    const modID = modIDInput.modID;
    const [modId, setModId] = useState(modID);
    const [github, setGithub] = useState("");
    const [forum, setForum] = useState("");
    const [donation, setDonation] = useState("");
    const [modInfoExists, setModInfoExists] = useState(false);
    
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if ModInfo exists for that mod
    // If it does, then GET the info and display it and allow editing
    
    // If it doesn't, then POST the info and display it

    useEffect(() => {
        const fetchModInfo = async () => {
          try {
            const token = localStorage.getItem("accessToken");
      
            const response = await axios.get(
              `${apiUrl}/mods/${modID}/info`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      
            console.log(response);
      
            if (response.status === 200) {
              setGithub(response.data.github);
              setForum(response.data.forum);
              setDonation(response.data.donation);
              setModInfoExists(true);
            } else {
              console.error(response);
              alert("Failed to get Mod Info.");
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              console.log("Unauthorized access");
              // handle unauthorized access here
            } else {
              console.error(error);
              alert("Failed to get Mod Info.");
            }
          }
        };
      
        fetchModInfo();
      }, []);
      

    
    const handleAddModInfo = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios.post(
                `${apiUrl}/mods/${modID}/info`,
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

            if (response.status === 200) {
                setGithub("");
                setForum("");
                setDonation("");
                alert("Mod Info added successfully!");
            } else {
                console.error(response);
                alert("Failed to add Mod Info.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access");
                // handle unauthorized access here
            } else {
                console.error(error);
                alert("Failed to add Mod Info.");
            }
        }
        // Reload Window
        window.location.reload();
    }

    const handleEditModInfo = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios.put(
                `${apiUrl}/mods/${modID}/info`,
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

            if (response.status === 200) {
                setGithub("");
                setForum("");
                setDonation("");
                alert("Mod Info updated successfully!");
            } else {
                console.error(response);
                alert("Failed to update Mod Info.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access");
                // handle unauthorized access here
            } else {
                console.error(error);
                alert("Failed to update Mod Info.");
            }
        }
        // Reload Window
        window.location.reload();
    }


    // If Mod Info Exists show menu to Edit
    // If Mod Info does not exist show add Menu
    // Check if ModInfo exists for that mod

    const handleGetModInfo = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios.get(
                `${apiUrl}/mods/${modID}/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response);

            if (response.status === 200) {
                setGithub(response.data.github);
                setForum(response.data.forum);
                setDonation(response.data.donation);
                setModInfoExists(true);
            } else {
                console.error(response);
                alert("Failed to get Mod Info.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized access");
                // handle unauthorized access here
            } else {
                console.error(error);
                alert("Failed to get Mod Info.");
            }
        }
    }
    
    console.log(modInfoExists);
    if (modInfoExists) {
        return (
            <div>
                <div className="form-control" class="form-control">
                    <form onSubmit={handleEditModInfo}>
                        <label htmlFor="github">Github</label>
                        <input type="text" id="github" value={github} onChange={(e) => setGithub(e.target.value)} />
                        <label htmlFor="forum">Forum</label>
                        <input type="text" id="forum" value={forum} onChange={(e) => setForum(e.target.value)} />
                        <label htmlFor="donation">Donation</label>
                        <input type="text" id="donation" value={donation} onChange={(e) => setDonation(e.target.value)} />
                        <button type="submit">Update Mod Info</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="form-control" class="form-control">
                    <form onSubmit={handleAddModInfo}>
                        <label htmlFor="github">Github</label>
                        <input type="text" id="github" value={github} onChange={(e) => setGithub(e.target.value)} />
                        <label htmlFor="forum">Forum</label>
                        <input type="text" id="forum" value={forum} onChange={(e) => setForum(e.target.value)} />
                        <label htmlFor="donation">Donation</label>
                        <input type="text" id="donation" value={donation} onChange={(e) => setDonation(e.target.value)} />
                        <button type="submit">Add Mod Info</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ModInfoForm;

            