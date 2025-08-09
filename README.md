# 家計簿アプリ (Kakeibo Budget App)

日本語の家計簿管理アプリケーションです。このリポジトリには2つのバージョンが含まれています。

## プロジェクト構成

```
kakeibo_02/
├── README.md                 # このファイル
├── setup.sh                  # 自動セットアップスクリプト
├── run.sh                    # サーバー起動スクリプト
├── kakei-app.html           # スタンドアロン版（ブラウザで直接開ける）
├── todo.html                # TODOリスト機能
├── todo.css                 # TODOリストのスタイル
├── todo.js                  # TODOリストのJavaScript
└── kskeibo01/               # Flask サーバー版
    ├── README.md            # サーバー版の詳細ドキュメント
    ├── requirements.txt     # Python依存関係
    ├── server.py           # Flaskサーバー
    ├── kakei-app.html      # サーバー版のHTMLファイル
    └── startup.sh          # Azure App Service用起動スクリプト
```

## 🚀 クイックスタート

### 方法1: 自動セットアップ（推奨）

```bash
# リポジトリをクローン
git clone https://github.com/AFukunaga06/kakeibo_02.git
cd kakeibo_02

# 自動セットアップを実行
./setup.sh

# サーバーを起動
./run.sh
```

### 方法2: 手動セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/AFukunaga06/kakeibo_02.git
cd kakeibo_02

# kskeibo01ディレクトリに移動
cd kskeibo01

# Python依存関係をインストール
pip install -r requirements.txt

# サーバーを起動
python server.py
```

## 📱 アプリケーションの使用方法

サーバーが起動したら、ブラウザで http://localhost:5000 にアクセスしてください。

### ログインパスワード
- **閲覧のみ**: `0317`
- **編集可能**: `r246`

## 🔧 2つのバージョンについて

### 1. スタンドアロン版
- `kakei-app.html` をブラウザで直接開くことができます
- データはブラウザのローカルストレージに保存されます
- サーバー不要で簡単に使用できます

### 2. Flask サーバー版（推奨）
- `kskeibo01/` ディレクトリ内のFlaskアプリケーション
- データはサーバー上の `expenses_data.json` ファイルに保存されます
- API経由でデータの共有が可能です
- Azure App Serviceへのデプロイに対応

## 📚 詳細ドキュメント

Flask サーバー版の詳細な情報（Azure デプロイ手順、API仕様など）については、`kskeibo01/README.md` をご覧ください。

## 🛠️ トラブルシューティング

### "requirements.txt が見つからない" エラー
- `requirements.txt` は `kskeibo01/` ディレクトリ内にあります
- ルートディレクトリではなく、`kskeibo01/` ディレクトリで `pip install -r requirements.txt` を実行してください

### "server.py が見つからない" エラー
- `server.py` は `kskeibo01/` ディレクトリ内にあります
- ルートディレクトリではなく、`kskeibo01/` ディレクトリで `python server.py` を実行してください

### 自動セットアップスクリプトが実行できない
```bash
chmod +x setup.sh run.sh
```

## 🤝 貢献

プロジェクトへの貢献を歓迎します。問題を発見した場合やアイデアがある場合は、Issueを作成してください。
