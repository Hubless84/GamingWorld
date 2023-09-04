import React, { useEffect, useState } from 'react';

const Table = ({ tableName }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${tableName}`);
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error(`Failed to fetch data for ${tableName}`);
        }
      } catch (error) {
        console.error(`Error fetching data for ${tableName}`, error);
      }
    };

    fetchData();
  }, [tableName]);

  if (!tableData || tableData.length === 0) {
    return <p>No data available for {tableName}.</p>;
  }

  const headers = Object.keys(tableData[0]);

  return (
    <div>
      <h2>{tableName}</h2>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
