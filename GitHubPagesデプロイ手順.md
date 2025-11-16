# GitHub Pagesでデプロイする手順

## ✅ 準備完了

静的サイト用に修正済みです。以下の手順でGitHub Pagesにデプロイできます。

## ステップ1: GitHubにコミット

### GitHub Desktopを使用する場合

1. **GitHub Desktopを開く**
2. **変更を確認**
   - 左側に変更されたファイルが表示されます
3. **コミット**
   - 下部の「Summary」に「GitHub Pages用に静的サイトに変更」と入力
   - 「Commit to main」をクリック
4. **プッシュ**
   - 「Push origin」をクリック

## ステップ2: GitHub Pagesを有効化

### 1. GitHubでリポジトリを開く

1. https://github.com にアクセス
2. あなたのリポジトリを開く

### 2. Settingsを開く

1. リポジトリページの上部タブで「Settings」をクリック
2. 左側のメニューで「Pages」をクリック

### 3. GitHub Pagesを有効化

1. **Source**セクションで：
   - 「Deploy from a branch」を選択
   - **Branch**: `main` を選択
   - **Folder**: `/ (root)` を選択
   - 「Save」をクリック

### 4. 公開URLを確認

1. 数分待つ（1〜2分）
2. 「Your site is live at」の下にURLが表示されます
   - 例: `https://your-username.github.io/soccer-standings/`
3. このURLをクリックしてアプリを確認

## 🎉 完成！

これで、GitHub Pagesでアプリが公開されました！

### アクセス方法

- URL: `https://your-username.github.io/soccer-standings/`
- このURLを誰かに共有できます
- 世界中の誰でもアクセス可能です

## 📝 注意事項

### サンプルデータについて

- GitHub Pagesは静的サイトのため、サーバーサイドのスクレイピングは使用できません
- 現在はサンプルデータを表示しています
- 最新データを取得するには、Vercelなどのサーバーが必要です

### 今後の更新方法

1. **ファイルを編集**
   - Cursorでファイルを編集

2. **GitHub Desktopでコミット**
   - 変更を確認
   - コミットメッセージを入力
   - 「Commit to main」→「Push origin」をクリック

3. **自動更新**
   - GitHub Pagesが自動的に更新を検知
   - 数分で新しいバージョンが公開されます

## 🔄 最新データが必要な場合

最新データを取得したい場合は、Vercelでデプロイしてください：
- `Vercelデプロイ手順.md` を参照

Vercelでは、サーバーサイドのスクレイピング機能が使えます。

