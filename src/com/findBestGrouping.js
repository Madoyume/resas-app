import calGroupFriendly from './calGroupFriendly'
/**
 * @name findBestGrouping
 * @description 友好度の総和を計算してグループ分けを実施
 * @author T.kotani
 * @param matrix  友好度情報配列
 * @param headers 友好度情報ヘッダー
 * @return {array} 友好度情報配列
 */

  // グループ分けの全組み合わせを評価する関数
const findBestGrouping = (matrix, headers) => {
    let bestScore = 0;
    let bestGrouping = [];

    // 全てを1グループにまとめるパターン
    const group1 = [headers];
    const score1 = calGroupFriendly(matrix, group1);
    if (score1 > bestScore) {
        bestScore = score1;
        bestGrouping = group1;
    }

    // 2グループに分ける全ての組み合わせ
    for (let i = 1; i < (1 << headers.length); i++) {
        const groupA = headers.filter((_, index) => (i & (1 << index)) > 0);
        const groupB = headers.filter((_, index) => (i & (1 << index)) === 0);
        if (groupA.length > 0 && groupB.length > 0) {
            const score2 = calGroupFriendly(matrix, [groupA, groupB]);
            if (score2 > bestScore) {
                bestScore = score2;
                bestGrouping = [groupA, groupB];
            }
        }
    }
    
    // 3グループに分ける全ての組み合わせ
    for (let i = 1; i < (1 << headers.length); i++) {
        for (let j = 1; j < (1 << headers.length); j++) {
        if (i & j) continue; // 重複する場合はスキップ
            
            const groupA = headers.filter((_, index) => (i & (1 << index)) > 0);
            const groupB = headers.filter((_, index) => (j & (1 << index)) > 0);
            const groupC = headers.filter((_, index) => (i & (1 << index)) === 0 && (j & (1 << index)) === 0);
            if (groupA.length > 0 && groupB.length > 0 && groupC.length > 0) {
                const score3 = calGroupFriendly(matrix, [groupA, groupB, groupC]);
                if (score3 > bestScore) {
                    bestScore = score3;
                    bestGrouping = [groupA, groupB, groupC];
                }
            }
        }
    }
    
    return { bestGrouping, bestScore };
    };

    export default findBestGrouping;
