# GitHubへのプッシュ手順

## 方法1: GitHub Desktopを使用（最も簡単）

### 1. GitHub Desktopをインストール

1. [GitHub Desktop](https://desktop.github.com/) をダウンロード
2. インストールして起動
3. GitHubアカウントでログイン

### 2. リポジトリを追加

1. GitHub Desktopで「File」→「Add Local Repository」をクリック
2. `/Users/kazuyaishibashi/Development/20251115` を選択
3. 「Add repository」をクリック

### 3. コミットとプッシュ

1. 左側のパネルで変更されたファイルを確認
2. 下部の「Summary」に「Initial commit」と入力
3. 「Commit to main」をクリック
4. 「Publish repository」をクリック
5. リポジトリ名を入力（例: `soccer-standings`）
6. 「Publish repository」をクリック

これでGitHubにプッシュ完了です！

## 方法2: ターミナルを使用

### 1. Xcodeコマンドラインツールをインストール

ターミナルで以下のコマンドを実行：

```bash
xcode-select --install
```

インストールダイアログが表示されるので、「インストール」をクリック（数分かかります）

### 2. Gitを初期化

```bash
cd /Users/kazuyaishibashi/Development/20251115

# Gitを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: サッカー順位表アプリ"
```

### 3. GitHubでリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 「New repository」をクリック
3. リポジトリ名を入力（例: `soccer-standings`）
4. 「Public」を選択
5. 「Create repository」をクリック

### 4. リモートリポジトリを追加してプッシュ

GitHubで作成したリポジトリのURLをコピーして、以下を実行：

```bash
# リモートリポジトリを追加（your-usernameとyour-repo-nameを実際の値に置き換え）
git remote add origin https://github.com/your-username/your-repo-name.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

GitHubのユーザー名とパスワード（またはPersonal Access Token）を入力します。

## 方法3: CursorのGit機能を有効にする

### 1. Cursorの設定を確認

1. Cursorで「Cmd + ,」で設定を開く
2. 「Git」を検索
3. 「Git: Enabled」が有効になっているか確認

### 2. ソース管理パネルを使用

1. 左側のソース管理アイコン（分岐マーク）をクリック
2. 「Initialize Repository」をクリック
3. 変更をステージング
4. コミットメッセージを入力
5. 「Commit」をクリック
6. 「Publish Branch」をクリック

## 次のステップ: デプロイ

GitHubにプッシュしたら、`DEPLOY.md`を参照してVercelやRenderでデプロイしてください。

