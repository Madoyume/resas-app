import React from 'react'
/**
 * @name FriendlyGroupsDisp
 * @description 友好度最大値グループ配列を表形式で表示
 * @author T.kotani
 * @param groups 友好度グループ
 * @returns 
 */

const FriendlyGroupsDisp = ({ groups }) => {
    // 友好度グループが無い場合
    if (groups.length === 0){
        return <div>Data not Found...</div>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>友好度グループ</th>
                    <th>県名</th>
                </tr>
            </thead>
            <tbody>
                {groups.map((group, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{group.join(',')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FriendlyGroupsDisp;