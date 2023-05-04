import React, { useEffect, useState } from "react";
import axios from "axios";

const AddDependency = ({ versionId, modId, onCloseMenu }) => {
    const [dependencyModID, setDependencyModID] = useState("");
    const [dependencyVersionID, setDependencyVersionID] = useState("");

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleAddDependency = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        try {

            const response = await axios.post(
                `${apiUrl}/mods/${modId}/dependencies/${versionId}`,
                {
                    versionId,
                    dependencyModID,
                    minimumDependencyVersion: dependencyVersionID,
                    maximumDependencyVersion: dependencyVersionID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data);
            onCloseMenu();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="dependency-menu">
            <form onSubmit={handleAddDependency}>
                <div className="form-control">
                    <label htmlFor="dependencyModID">Dependency Mod Id</label>
                    <input type="text" id="dependencyModID" value={dependencyModID} onChange={(e) => setDependencyModID(e.target.value)} />
                    <label htmlFor="dependencyVersionID">Dependency Version Id</label>
                    <input type="text" id="dependencyVersionID" value={dependencyVersionID} onChange={(e) => setDependencyVersionID(e.target.value)} />
                    <button type="submit" >Add Dependency</button>
                </div>
            </form>
        </div>
    );
};

export default AddDependency;