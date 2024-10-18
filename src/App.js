import React, { useState, useEffect } from 'react';
import './App.css';
import { prefectures, years } from './constants';
import Papa from 'papaparse';

/*
    function: App

    created: 2024.10.15 kotani
    updated:
*/

function App() {
  // 人口データを取得
  const [populationData, setPopulationData] = useState([]);

  // RESAS APIから人口データを取得
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
    
          // 取得したjsonデータ読み込み
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

  // 友好度情報CSVデータを取得
  const [csvFriendlyData, setCsvFriendlyData] = useState([]);

  // 友好度データCSV読み込み処理
  useEffect(() => {
    // publicフォルダ内のCSVファイルを読み込み
    fetch('/csv/sample.csv')
    .then(response => {
      if (!response.ok) {
        // エラーが発生した場合
        throw new Error('友好度データの読み込みに失敗しました。');
      }
      return response.text();
    })

    // fetchで読み込んだCSVテキストをPapaParseでパース
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // ヘッダー行をスライス加工
          const deleteHeaderData = results.data.map(row => ({
            base: row.x,
            values: Object.entries(row).slice(1)
          }));
          // パースされたCSVデータをセットする
          setCsvFriendlyData(deleteHeaderData);
        }
      });
    })

    // 例外処理
    .catch(error => {
      console.error('友好度データの読み込みに失敗しました。', error);
    });

  // コンポーネントの初回マウント時にのみ実行する
  }, []);

  // 表示処理
  return (
    <div className="App">
      <h1>首都圏の総人口</h1>
      <PopulationTable data={populationData} />

      <h1>友好度データの読み込み結果</h1>

      {/* CSVデータの表示 */}
      <pre>{JSON.stringify(csvFriendlyData, null, 2)}</pre>
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