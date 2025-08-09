#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # CORSを有効にして、フロントエンドからのアクセスを許可

# データファイルのパス
DATA_FILE = 'expenses_data.json'

def load_expenses():
    """JSONファイルから支出データを読み込み"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    return []

def save_expenses(expenses):
    """支出データをJSONファイルに保存"""
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(expenses, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving expenses: {e}")
        return False

@app.route('/')
def index():
    """メインページを返す"""
    return send_file('kakei-app.html')

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    """支出データを取得"""
    expenses = load_expenses()
    return jsonify(expenses)

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    """新しい支出を追加"""
    try:
        expense_data = request.json
        
        # 必要なフィールドの検証
        required_fields = ['date', 'category', 'product', 'store', 'amount']
        for field in required_fields:
            if field not in expense_data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        # 現在の支出データを読み込み
        expenses = load_expenses()
        
        # 新しい支出データを作成
        new_expense = {
            'id': int(datetime.now().timestamp() * 1000),  # ミリ秒タイムスタンプをIDとして使用
            'date': expense_data['date'],
            'category': expense_data['category'],
            'product': expense_data['product'],
            'store': expense_data['store'],
            'amount': int(expense_data['amount'])
        }
        
        # 支出データに追加
        expenses.append(new_expense)
        
        # ファイルに保存
        if save_expenses(expenses):
            return jsonify(new_expense), 201
        else:
            return jsonify({'error': 'Failed to save expense'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    """指定IDの支出を削除"""
    try:
        expenses = load_expenses()
        original_length = len(expenses)
        
        # 指定IDの支出を削除
        expenses = [exp for exp in expenses if exp['id'] != expense_id]
        
        if len(expenses) < original_length:
            if save_expenses(expenses):
                return jsonify({'message': 'Expense deleted successfully'}), 200
            else:
                return jsonify({'error': 'Failed to save changes'}), 500
        else:
            return jsonify({'error': 'Expense not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    
    # Azure App Service用のポート設定
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print(f"家計簿サーバーを起動中... (Port: {port})")
    print(f"フロントエンド: http://localhost:{port}")
    print(f"API エンドポイント: http://localhost:{port}/api/expenses")
    
    app.run(host='0.0.0.0', port=port, debug=debug)