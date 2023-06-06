import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ModInfoForm = ({ modID }) => {
  const dialogRef = useRef(null);
  const [github, setGithub] = useState("");
  const [forum, setForum] = useState("");
  const [donation, setDonation] = useState("");
  const [modInfoExists, setModInfoExists] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchModInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`${apiUrl}/mods/${modID}/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        if (response.status === 200) {
          setGithub(response.data.github);
          setForum(response.data.forum);
          setDonation(response.data.donation);
          setModInfoExists(true);
        } else {
          console.error(response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access");
          // handle unauthorized access here
        } else {
          console.error(error);
        }
      }
    };

    fetchModInfo();
  }, []);

  const handleAddModInfo = async () => {
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
  };

  const handleEditModInfo = async () => {
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
  };

  const handleOpen = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <button onClick={handleOpen}>Social</button>

      <dialog ref={dialogRef} class="dialog">
        <div>
          <form onSubmit={modInfoExists ? handleEditModInfo : handleAddModInfo}>
            <label htmlFor="github">Github</label>
            <input
              type="text"
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <label htmlFor="forum">Forum</label>
            <input
              type="text"
              id="forum"
              value={forum}
              onChange={(e) => setForum(e.target.value)}
            />
            <label htmlFor="donation">Donation</label>
            <input
              type="text"
              id="donation"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
            />
            <button type="submit">
              {modInfoExists ? "Update Mod Info" : "Add Mod Info"}
            </button>
          </form>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </dialog>
    </>
  );
};

export default ModInfoForm;
