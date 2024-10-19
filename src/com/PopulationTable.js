import React from 'react';
import { years } from '../constants';

/**
 * @name PopulationTable
 * @description 
 * @author T.kotani
 * @param data RESAS-APIデータ
 * @returns 
 */

const PopulationTable = ({ data, groups }) => {
    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    // グループごとに色分け
    var g1, g2, g3 = [];
    groups.forEach((group, index) => {
        switch (index) {
            case 0:
                g1 = {
                    color: "#DDFFFF",
                    g: group
                };
                break;
            case 1:
                g2 = {
                    color: "#FFFFCC",
                    g: group
                };
                break;
            case 2:
                g3 = {
                    color: "#FFDDFF",
                    g: group
                };
                break;
            default:
                break;
        }
    });

    // 配列内に含まれる県名に一致するグループの色を指定
    const getColorForGroup = (prefName) => {
        if (g1 && g1.g.includes(prefName)) return g1.color;
        if (g2 && g2.g.includes(prefName)) return g2.color;
        if (g3 && g3.g.includes(prefName)) return g3.color;
        return "#f4f4f4"; // デフォルト色
    };

    return (
        <table border="1">
        <thead>
            <tr>
            <th>年代</th>
            {data.map((pref) => (
                <th key={pref.name} style={{ backgroundColor: getColorForGroup(pref.name) }}>{pref.name}</th>
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

export default PopulationTable;