/**
 * @name buildFriendlyData
 * @description 友好度データを配列化して返却
 * @author T.kotani
 * @param csvFriendlyData 友好度情報データ 
 * @return {array} 友好度情報配列
 */

const buildFriendlyData = (csvFriendlyData) => {
    /** 友好度情報を保存する配列 */
    const array = {};
    /** 友好度配列ヘッダー */
    const headers = csvFriendlyData.map(row => row.base);

    // arrayに県ごとの初期値を設定
    headers.forEach(rowName => {
        array[rowName] = {};
        headers.forEach(colName => {
            // 対象の県の友好度初期値を0に設定
            array[rowName][colName] = 0;
        });
    });

    // 友好度配列に対応した友好度の値を配列に入れる
    csvFriendlyData.forEach(row => {
        row.values.forEach(([colName, value]) => {
            array[row.base][colName] = parseInt(value, 10);
        });
    });
    
    return array;
}

export default buildFriendlyData;