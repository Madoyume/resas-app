import React from 'react';
import { years } from '../constants';

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

export default PopulationTable;