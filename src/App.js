import React, { useState, useEffect } from 'react';
import './App.css';
import { prefectures } from './constants';
import Papa from 'papaparse';
import PopulationTable from './com/PopulationTable';
import buildFriendlyData from './com/buildFriendlyData';
import findBestGrouping from './com/findBestGrouping';
import FriendlyGroupsDisp from './com/FriendlyGroupsDisp';

/**
 * @name RESAS-App
 * @author T.kotani
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
    
          // 取得したデータをjson形式で代入
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

  // コンポーネントの初回レンダリング後にのみ実行する
  }, []);

  // 友好度が最大になるグループ配列
  const [bestGrouping, setBestGrouping] = useState([]);
  // 友好度合計の最大値
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    // csvFriendlyDataから数値データの連想配列を構築
    const matrix = buildFriendlyData(csvFriendlyData);
    // csvFriendlyDataからbase(ヘッダー行)を取り出して配列化
    const headers = csvFriendlyData.map(row => row.base);

    // 友好度が最大値になるグループ分けを算出
    const { bestGrouping, bestScore } = findBestGrouping(matrix, headers);
    setBestGrouping(bestGrouping);
    setBestScore(bestScore);

  // [csvFriendlyData]が変更されるたびに実行
  }, [csvFriendlyData]);

  // 表示処理
  return (
    <div className="App">
      <h1>首都圏の総人口</h1>
      <PopulationTable data={populationData} />

      <h1>友好度グループ分け結果</h1>
      <FriendlyGroupsDisp groups={bestGrouping} />

      <h1>友好度の合計: {bestScore}</h1>

    </div>
  );
}

export default App;