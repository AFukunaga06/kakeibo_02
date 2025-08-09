#!/bin/bash

echo "🏠 家計簿アプリのセットアップを開始します..."
echo ""

if [ ! -d "kskeibo01" ]; then
    echo "❌ エラー: kskeibo01ディレクトリが見つかりません"
    echo "   このスクリプトはプロジェクトのルートディレクトリで実行してください"
    exit 1
fi

if [ ! -f "kskeibo01/requirements.txt" ]; then
    echo "❌ エラー: kskeibo01/requirements.txt が見つかりません"
    exit 1
fi

echo "📦 Python依存関係をインストール中..."
cd kskeibo01

if pip install -r requirements.txt; then
    echo "✅ 依存関係のインストールが完了しました"
else
    echo "❌ 依存関係のインストールに失敗しました"
    echo "   Pythonとpipが正しくインストールされているか確認してください"
    exit 1
fi

cd ..

echo ""
echo "🎉 セットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. サーバーを起動: ./run.sh"
echo "2. ブラウザで http://localhost:5000 にアクセス"
echo "3. パスワードでログイン:"
echo "   - 閲覧のみ: 0317"
echo "   - 編集可能: r246"
echo ""
