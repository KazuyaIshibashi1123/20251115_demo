# Node.jsのインストール方法（macOS）

## 方法1: 公式インストーラーを使用（推奨）

1. **Node.js公式サイトにアクセス**
   - https://nodejs.org/ にアクセス
   - 「LTS」バージョンをダウンロード（推奨）

2. **インストーラーを実行**
   - ダウンロードした `.pkg` ファイルを開く
   - インストールウィザードに従ってインストール

3. **インストール確認**
   ```bash
   node --version
   npm --version
   ```

## 方法2: コマンドラインからインストール

ターミナルで以下のコマンドを実行：

```bash
# Node.js公式のインストールスクリプトを使用
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# ターミナルを再起動後
nvm install --lts
nvm use --lts
```

## インストール後の手順

1. **依存関係のインストール**
   ```bash
   cd /Users/kazuyaishibashi/Development/20251115
   npm install
   ```

2. **サーバーの起動**
   ```bash
   npm start
   ```

3. **ブラウザでアクセス**
   - http://localhost:3000 にアクセス

## トラブルシューティング

### Node.jsが見つからない場合

ターミナルを再起動してください。それでも解決しない場合は、パスを確認：

```bash
echo $PATH
which node
```

### 権限エラーが発生する場合

```bash
sudo npm install
```

ただし、通常は `sudo` は不要です。

