import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './ModList.css';

const ModList = () => {
  const [mods, setMods] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://modauthorapi.onrender.com:3001';
    const token = localStorage.getItem('accessToken');
    axios.get(`${apiUrl}/mods`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      { Header: 'Author', accessor: 'modAuthor' },
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

  return (
    <div className="mods-list-container">
      <h2>List of Mods</h2>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModList;
