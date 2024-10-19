/**
 * @name calGroupFriendly
 * @description グループごとの友好度合計を計算する関数
 * @author T.kotani
 * @param matrix  友好度情報配列
 * @param groups 県名ヘッダー
 * @return {totalScore}  友好度合計値
 */

const calGroupFriendly = (matrix, groups) => {
    /** 友好度合計値 */
    let totalScore = 0;

    groups.forEach(group => {
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                const a = group[i];
                const b = group[j];
                totalScore += matrix[a][b];
            }
        }
    });

    return totalScore;
};

export default calGroupFriendly;