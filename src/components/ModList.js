import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './ModList.css';
import ModMenu from './ModMenu';

const ModList = (  ) => {
  const [mods, setMods] = useState([]);
  const [selectedMod, setSelectedMod] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    axios
      .get(`${apiUrl}/mods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMods(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Mod ID', accessor: 'modID' },
      { Header: 'Name', accessor: 'modName' },
      { Header: 'Description', accessor: 'modDescription' },
      { Header: 'Version', accessor: 'modVersion' },
      { Header: 'Release Date', accessor: 'modReleaseDate' },
      { Header: 'Tags', accessor: 'modTags' },
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
  };

  const handleCloseMenu = () => {
    setSelectedMod(null);
  };

  return (
    <div className="mods-list-container">
      <div className="mods-list-change-container" class="change ">
        <h2>Your Mods</h2>
        <table {...getTableProps()} className="table">
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
      </div>
      {selectedMod && (
        <ModMenu modObject={selectedMod} onCloseMenu={handleCloseMenu} />
      )}
    </div>
  );
};

export default ModList;
