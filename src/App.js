import React, { useState, useEffect } from 'react';
import './App.css';
import { prefectures, years } from './constants';

/*
    function: App

    created: 2024.10.15 kotani
    updated:
*/

function App() {
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const responses = await Promise.all(prefectures.map(async (prefecture) => {
          const response = await fetch(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefecture.code}&cityCode=-`,
            {
              headers: {
                'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY
              }
            }
          );
    
          const data = await response.json();
  
          return { name: prefecture.name, data: data.result.data[0].data };
        }));
  
        setPopulationData(responses);
      } catch (error) {
        console.error('Error fetching population data:', error);
      }
    };
  
    fetchPopulationData();
  }, []);
  
  return (
    <div className="App">
      <h1>首都圏の総人口</h1>
      <PopulationTable data={populationData} />
    </div>
  );
}

const PopulationTable = ({ data }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>年代</th>
          {data.map((pref) => (
            <th key={pref.name}>{pref.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {years.map((year) => (
          <tr key={year}>
            <td>{year}</td>
            {data.map((pref) => {
              const populationForYear = pref.data.find((item) => item.year === year);
              return <td key={pref.name}>{populationForYear ? populationForYear.value.toLocaleString() : 'N/A'}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;