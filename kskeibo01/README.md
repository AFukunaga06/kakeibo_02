# 家計簿アプリ（サーバー対応版）

## 概要
カレンダー機能付きの家計簿アプリです。
バックエンド（編集用）とフロントエンド（閲覧用）でデータを共有できます。

## 機能
- パスワード認証
  - 閲覧専用: `0317`
  - 編集可能: `r246`
- カレンダー表示
- 月合計表示
- 過去日付入力対応
- データ共有（サーバー経由）

## Azure App Service デプロイ手順

### 1. Azure CLIでログイン
```bash
az login
```

### 2. リソースグループを作成
```bash
az group create --name kakei-app --location japaneast
```

### 3. App Serviceプランを作成
```bash
az appservice plan create --name kakei-plan --resource-group kakei-app --sku B1 --is-linux
```

### 4. Web Appを作成
```bash
az webapp create --resource-group kakei-app --plan kakei-plan --name kakei-budget-app --runtime "PYTHON|3.9" --deployment-source-url https://github.com/AFukunaga06/kskeibo01.git
```

### 5. 継続的デプロイを有効化（オプション）
```bash
az webapp deployment source config --name kakei-budget-app --resource-group kakei-app --repo-url https://github.com/AFukunaga06/kskeibo01.git --branch master --manual-integration
```

### 6. アクセス
デプロイ完了後、以下のURLでアクセス可能：
```
https://kakei-budget-app.azurewebsites.net
```

## ローカル環境での起動

### 1. 依存関係をインストール
```bash
pip install -r requirements.txt
```

### 2. サーバーを起動
```bash
python server.py
```

### 3. ブラウザでアクセス
```
http://localhost:5000
```

## パスワード
- **閲覧のみ**: `0317`
- **編集可能**: `r246`

## データ保存
- サーバー上の `expenses_data.json` ファイルにデータが保存されます
- 編集用パスワードでデータを追加・削除すると、閲覧用パスワードでも同じデータが表示されます

## API エンドポイント
- `GET /api/expenses` - 支出データ取得
- `POST /api/expenses` - 支出データ追加
- `DELETE /api/expenses/<id>` - 支出データ削除