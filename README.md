# サッカー順位表アプリケーション

Jリーグとプレミアリーグの順位表を表示するWebアプリケーションです。Yahooスポーツからスクレイピングして最新の順位表データを取得します。

## 機能

- Jリーグとプレミアリーグの順位表を表示
- ボタンでリーグを切り替え
- **スクレイピング機能**: Yahooスポーツから最新データを自動取得
- レスポンシブデザイン対応
- ログイン・ログアウト機能

## デプロイ方法

### 方法1: Vercel（推奨）

1. **GitHubにプッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

2. **Vercelでデプロイ**
   - [Vercel](https://vercel.com) にアクセス
   - GitHubアカウントでログイン
   - 「New Project」をクリック
   - リポジトリを選択
   - 設定：
     - Framework Preset: Other
     - Build Command: `npm install`
     - Output Directory: `.`
     - Install Command: `npm install`
   - 「Deploy」をクリック

3. **Vercelの設定ファイルを作成**（`vercel.json`）
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

### 方法2: Render

1. **GitHubにプッシュ**（上記と同じ）

2. **Renderでデプロイ**
   - [Render](https://render.com) にアクセス
   - GitHubアカウントでログイン
   - 「New +」→「Web Service」を選択
   - リポジトリを選択
   - 設定：
     - Name: `soccer-standings`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - 「Create Web Service」をクリック

### 方法3: Railway

1. **GitHubにプッシュ**（上記と同じ）

2. **Railwayでデプロイ**
   - [Railway](https://railway.app) にアクセス
   - GitHubアカウントでログイン
   - 「New Project」→「Deploy from GitHub repo」を選択
   - リポジトリを選択
   - 自動的にデプロイされます

## ローカル開発

### セットアップ

```bash
# 依存関係をインストール
npm install

# サーバーを起動
npm start
```

ブラウザで `http://localhost:3000` にアクセス

## ファイル構成

- `index.html` - メインページ
- `login.html` - ログインページ
- `styles.css` - スタイルシート
- `script.js` - メインのJavaScript
- `auth.js` - 認証機能
- `server.js` - Node.jsサーバー（スクレイピング機能）
- `package.json` - Node.js依存関係

## APIエンドポイント

- **Jリーグ**: `/api/jleague`
- **プレミアリーグ**: `/api/premier`

## 注意事項

### 利用規約の遵守

- スクレイピングを行う際は、各サイトの利用規約を必ず確認してください
- robots.txtを確認し、スクレイピングが許可されているか確認してください
- 過度なリクエストは避け、適切な間隔を空けてアクセスしてください
- 個人利用・学習目的での使用を推奨します

### 技術的な注意点

- サイトのHTML構造が変更されると、スクレイピングが失敗する可能性があります
- その場合は、`server.js`のセレクタを更新する必要があります
- エラーが発生した場合、サンプルデータが表示されます

## ライセンス

このプロジェクトはサンプルコードです。

