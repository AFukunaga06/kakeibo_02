#!/bin/bash

echo "🚀 家計簿アプリサーバーを起動中..."
echo ""

if [ ! -d "kskeibo01" ]; then
    echo "❌ エラー: kskeibo01ディレクトリが見つかりません"
    echo "   このスクリプトはプロジェクトのルートディレクトリで実行してください"
    exit 1
fi

if [ ! -f "kskeibo01/server.py" ]; then
    echo "❌ エラー: kskeibo01/server.py が見つかりません"
    exit 1
fi

if ! python -c "import flask" 2>/dev/null; then
    echo "⚠️  警告: Flask がインストールされていません"
    echo "   まず ./setup.sh を実行してください"
    echo ""
    read -p "今すぐセットアップを実行しますか？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ./setup.sh
        if [ $? -ne 0 ]; then
            echo "❌ セットアップに失敗しました"
            exit 1
        fi
    else
        echo "❌ セットアップをキャンセルしました"
        exit 1
    fi
fi

echo "📍 kskeibo01ディレクトリに移動中..."
cd kskeibo01

echo "🌐 Flaskサーバーを起動中..."
echo ""
echo "アクセス情報:"
echo "  URL: http://localhost:5000"
echo "  パスワード:"
echo "    - 閲覧のみ: 0317"
echo "    - 編集可能: r246"
echo ""
echo "サーバーを停止するには Ctrl+C を押してください"
echo ""

python server.py
