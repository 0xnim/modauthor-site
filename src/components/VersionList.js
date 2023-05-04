import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import VersionMenu from './VersionMenu';
import './VersionList.css';
import AddVersion from './AddVersion';

const VersionList = ( modID ) => {
  const [mods, setMods] = useState([]);
  const [selectedMod, setSelectedMod] = useState(null);
  const modId = modID.modID;
  const [isFormOpen, setIsFormOpen] = useState(false);
  //modID is passed from ModMenu.js

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    axios
      .get(`${apiUrl}/mods/${modId}/versions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMods(response.data);
        //console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Version ID', accessor: 'modVersionId' },
      { Header: 'Mod ID', accessor: 'modId' },
      { Header: 'Version', accessor: 'versionNumber' },
      { Header: 'Release Date', accessor: 'releaseDate' },
      { Header: 'Changelog', accessor: 'changelog' },
    ],
    []
  );

  const data = React.useMemo(() => mods, [mods]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleSelectMod = (modId) => {
    const mod = mods.find((mod) => mod.modID === modId);
    setSelectedMod(mod);
    //console.log("brr");
  };

  const handleCloseMenu = () => {
    setSelectedMod(null);
  };

  const handleOpenVersionForm = () => {
    setIsFormOpen(!isFormOpen);
  };
    

  return (
    <div className="version-list-container">
      <div className="version-list-change-container">
        <h2>{modID.modID} Versions</h2>
        <table {...getTableProps()} className="table" class="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleSelectMod(row.values.modID)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="dashboard-no-mod-list-container">
            <button class="add" onClick={handleOpenVersionForm}>{isFormOpen ? 'Close' : 'Add Version'}</button>
            {isFormOpen && <AddVersion modID={modID.modID} onCloseMenu={() => setIsFormOpen(false)}
            />}
        </div>
      </div>
      {selectedMod && (
        <VersionMenu versionId={selectedMod.modVersionId} modId={modId} onCloseMenu={handleCloseMenu} />
      )}
    </div>
  );
};

export default VersionList;