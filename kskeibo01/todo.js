class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        const todoInput = document.getElementById('todoInput');
        const addBtn = document.getElementById('addBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearCompleted = document.getElementById('clearCompleted');

        // タスク追加
        addBtn.addEventListener('click', () => this.addTodo());
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // フィルター
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // 完了済みタスクを削除
        clearCompleted.addEventListener('click', () => this.clearCompleted());
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text === '') {
            alert('タスクを入力してください');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        input.value = '';
        this.saveTodos();
        this.render();
        this.updateStats();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
        this.updateStats();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // フィルターボタンのアクティブ状態を更新
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
        this.updateStats();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();
        
        todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'todo-item';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.style.color = '#888';
            
            let message;
            switch (this.currentFilter) {
                case 'active':
                    message = '未完了のタスクはありません';
                    break;
                case 'completed':
                    message = '完了済みのタスクはありません';
                    break;
                default:
                    message = 'タスクがありません。新しいタスクを追加してください。';
            }
            
            emptyMessage.textContent = message;
            todoList.appendChild(emptyMessage);
            return;
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="todoApp.toggleTodo(${todo.id})">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})" title="削除">×</button>
            `;
            
            todoList.appendChild(li);
        });
    }

    updateStats() {
        const todoCount = document.getElementById('todoCount');
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        const totalTodos = this.todos.length;
        
        if (totalTodos === 0) {
            todoCount.textContent = 'タスクがありません';
        } else {
            todoCount.textContent = `${activeTodos} / ${totalTodos} 個のタスク`;
        }

        // 完了済みタスクがない場合は削除ボタンを無効化
        const clearBtn = document.getElementById('clearCompleted');
        const completedTodos = this.todos.filter(todo => todo.completed).length;
        clearBtn.style.opacity = completedTodos > 0 ? '1' : '0.5';
        clearBtn.style.cursor = completedTodos > 0 ? 'pointer' : 'not-allowed';
        clearBtn.disabled = completedTodos === 0;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// アプリケーションの初期化
const todoApp = new TodoApp();

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
    // 入力フィールドにフォーカス
    document.getElementById('todoInput').focus();
});