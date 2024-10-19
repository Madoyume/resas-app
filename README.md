# 環境構築手順
## 1.React環境のセットアップ

以下の手順で開発環境を構築しました。

1. Node.js(v20.18.0)インストール
2. npx create-react-app resus-app
3. cd .\resas-app\
4. npm start

## 2.RESAS APIのアカウント登録
https://opendata.resas-portal.go.jp/

RESAS APIにアカウント登録し、開発用のAPIキーを取得しました。

## 2.Papa parseのインストール

`npm install papaparse`

読み取ったCSVをパースするために使えるライブラリをインストールしました。

# 参考
## 新・日本一わかりやすいReact入門【基礎編】Reactの基礎知識
https://youtu.be/XKSYF2aZnkQ?si=ZIpMr4235pw3zaGj

Reactはしっかり触ったことが無かったので、基礎知識を学ぶためにYouTube検索でヒットしたこの動画を一気見しました。
環境構築やReactの概念、useStateとuseEffectの仕組みを理解するために活用しています。
今回のアプリを構築するにあたり必要な要素のほとんどをこの動画からスタートしました。

## Zenn - Promise.all()を使って反復処理を速く実行
https://zenn.dev/nori_maki/articles/16906e4c2feaa7

RESASから取得するデータが複数あるため、非同期処理を連続で実装する方法を検索して参考にしました。
Promise.All()で要素数に応じて反復処理による処理効率の改善する手法を紹介しており、
RESASでマップした定数ごとに処理を反復させるために活用しています。

## JavaScriptのスマートな配列操作テクニック
https://ics.media/entry/200825/
Javascriptで配列要素の操作を実施するために参考にしました。
mapメソッドの利用により、既存の配列を加工して新しい配列を作成するのに活用しています。

## Apidog - ReactでFetchを使ってAPIからデータを取得
https://apidog.com/jp/blog/react-fetch-api-tutorial/

RESAS APIからデータを取得して加工するために検索した結果ヒットしたブログを参考にしました。
ReactからAPIコールしてデータを画面表示する実装部分で利用しています。

## 【JavaScriptの基本】配列メソッド -forEach・map・filterの違い
https://tcd-theme.com/2021/07/javascript-array-foreach-map-filter.html

javascriptにおける配列データの操作メソッドを検索して、ヒットした当ブログを参考にしました。

## サメハック - Papaparseを使ってCSVファイルを読み込もう！
https://samehack.com/papaparse/

CSVの読み取りとデータ加工を実装するために、Google検索でトップに出た当ブログを参考にしました。
App.js内に追加で実装したCSVファイルの読み取り処理の部分で利用しています。

## DevelopersIO - JavaScriptでCSVを読み込んでJSONを作る 
https://dev.classmethod.jp/articles/how-to-make-json-from-csv-using-javascript/

読み込んだCSVファイルをJSON形式で加工するために、CSV-JSONで検索して参考にしました。



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
