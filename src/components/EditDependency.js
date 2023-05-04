import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditDependency = ({ modId, versionId, dependencyId, onCloseMenu }) => {
  const [minimumDependencyVersion, setMinimumDependencyVersion] = useState("");
  const [maximumDependencyVersion, setMaximumDependencyVersion] = useState("");
  const [dependencyType, setDependencyType] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  // Request current dependency details
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    axios
        .get(`${apiUrl}/mods/${modId}/dependencies/${versionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const dependency = response.data.find(item => item.id === dependencyId);
            if (dependency) {
              setMinimumDependencyVersion(dependency.minimumDependencyVersion);
              setMaximumDependencyVersion(dependency.maximumDependencyVersion);
              setDependencyType(dependency.dependencyType);
            } else {
              // handle the case where the object is not found
            }
          })
        .catch((error) => {
            console.error(error);
        });
    }, [apiUrl, modId, versionId, dependencyId]);



  const handleEditDependency = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    
    try {
      const response = await axios.put(
        `${apiUrl}/mods/${modId}/dependencies/${versionId}/${dependencyId}`,
        {
          //dependencyModId: ,
          minimumDependencyVersion,
          maximumDependencyVersion,
          dependencyType,
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
    <div className="dependency-edit">
      <form onSubmit={handleEditDependency}>
        <div className="form-control">
            <h1>{modId}</h1>
          <label htmlFor="minimumDependencyVersion">Minimum Version</label>
          <input
            type="text"
            id="minimumDependencyVersion"
            value={minimumDependencyVersion}
            onChange={(e) => setMinimumDependencyVersion(e.target.value)}
          />
          <label htmlFor="maximumDependencyVersion">Maximum Version</label>
          <input
            type="text"
            id="maximumDependencyVersion"
            value={maximumDependencyVersion}
            onChange={(e) => setMaximumDependencyVersion(e.target.value)}
          />
          <label htmlFor="dependencyType">Dependency Type</label>
          <select
            id="dependencyType"
            value={dependencyType}
            onChange={(e) => setDependencyType(e.target.value)}
          >
            <option value="">Select a dependency type</option>
            <option value="required">Required</option>
            <option value="optional">Optional</option>
            <option value="incompatible">Incompatible</option>
            {/* add more options as needed */}
          </select>
          <button type="submit" style={{ margin: 10 }}>Submit</button>
        </div>
        
      </form>
    </div>
  );
}

export default EditDependency;