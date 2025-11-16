# 無料で外部公開する方法

## ステップ1: GitHubにプッシュ

### 1. GitHubリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 「New repository」をクリック
3. リポジトリ名を入力（例: `soccer-standings`）
4. 「Public」を選択
5. 「Create repository」をクリック

### 2. ローカルでGitを初期化してプッシュ

```bash
# Gitを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: サッカー順位表アプリ"

# GitHubリポジトリを追加（your-usernameとyour-repo-nameを実際の値に置き換え）
git remote add origin https://github.com/your-username/your-repo-name.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

## ステップ2: Vercelでデプロイ（推奨）

### 1. Vercelに登録

1. [Vercel](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択してGitHubアカウントでログイン

### 2. プロジェクトをインポート

1. ダッシュボードで「Add New...」→「Project」をクリック
2. GitHubリポジトリを選択
3. 設定：
   - **Framework Preset**: Other
   - **Root Directory**: `./`（そのまま）
   - **Build Command**: （空欄のまま）
   - **Output Directory**: （空欄のまま）
   - **Install Command**: `npm install`
4. 「Deploy」をクリック

### 3. 環境変数（必要に応じて）

通常は環境変数は不要ですが、必要に応じて設定できます。

### 4. デプロイ完了

数分でデプロイが完了し、`https://your-project-name.vercel.app` のようなURLが発行されます。

## ステップ3: Renderでデプロイ（代替案）

### 1. Renderに登録

1. [Render](https://render.com) にアクセス
2. 「Get Started for Free」をクリック
3. GitHubアカウントでログイン

### 2. 新しいWebサービスを作成

1. 「New +」→「Web Service」をクリック
2. GitHubリポジトリを選択
3. 設定：
   - **Name**: `soccer-standings`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. 「Create Web Service」をクリック

### 3. デプロイ完了

数分でデプロイが完了し、`https://soccer-standings.onrender.com` のようなURLが発行されます。

## 注意事項

### スクレイピングの利用規約

- Yahooスポーツの利用規約を確認してください
- 過度なリクエストは避けてください
- 個人利用・学習目的での使用を推奨します

### 無料プランの制限

- **Vercel**: 
  - 無料プランで十分な機能を提供
  - サーバーレス関数の実行時間制限あり
- **Render**: 
  - 無料プランは15分間の非アクティブ後にスリープ
  - 初回アクセス時に起動に時間がかかる場合あり

### トラブルシューティング

- デプロイが失敗する場合、`package.json`の依存関係を確認
- ログを確認してエラーを特定
- `server.js`のポート設定を確認（Vercel/Renderは自動的にポートを設定）

## カスタムドメイン（オプション）

無料プランでもカスタムドメインを設定できます：

1. Vercel/Renderのダッシュボードで「Domains」を開く
2. ドメイン名を入力
3. DNS設定を案内に従って設定

