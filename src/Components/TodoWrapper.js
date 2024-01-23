import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('pending');
    const [animationClass, setAnimationClass] = useState('');

    const addTodo = (todo) => {
        const newTodos = [
            ...todos,
            {
                id: uuidv4(),
                task: todo,
                completed: false,
                isEditing: false,
                createdAt: Date.now(),
            },
        ];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
            ),
        );
    };

    const editTask = (task, id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id
                ? { ...todo, task, isEditing: !todo.isEditing }
                : todo,
        );
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const filterTodos = () => {
        let filteredTodos;
        switch (filter) {
            case 'completed':
                filteredTodos = todos.filter((todo) => todo.completed);
                break;
            case 'pending':
                filteredTodos = todos.filter((todo) => !todo.completed);
                break;
            default:
                filteredTodos = todos;
        }
        switch (sortOrder) {
            case 'completed':
                return filteredTodos.sort((a, b) => b.completed - a.completed);
            case 'pending':
                return filteredTodos.sort((a, b) => a.completed - b.completed);
            default:
                return filteredTodos;
        }
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        setAnimationClass('fade-out');
        const timeoutId = setTimeout(() => setAnimationClass(''), 500);
        return () => clearTimeout(timeoutId);
    }, [filter, sortOrder]);

    return (
        <div className="TodoWrapper">
            <h1>Today is a great day!</h1>
            <TodoForm addTodo={addTodo} />
            <div style={{ paddingBottom: '20px' }}>
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        value="completed"
                        checked={filter === 'completed'}
                        onChange={() => setFilter('completed')}
                    />
                    Completed
                </label>
                <label>
                    <input
                        type="radio"
                        value="pending"
                        checked={filter === 'pending'}
                        onChange={() => setFilter('pending')}
                    />
                    Pending
                </label>
            </div>
            <div style={{ paddingBottom: '20px' }}>
                <label>
                    <input
                        type="radio"
                        value="pending"
                        checked={sortOrder === 'pending'}
                        onChange={() => setSortOrder('pending')}
                    />
                    Sort by Pending
                </label>
                <label>
                    <input
                        type="radio"
                        value="completed"
                        checked={sortOrder === 'completed'}
                        onChange={() => setSortOrder('completed')}
                    />
                    Sort by Completed
                </label>
            </div>
            {filterTodos().map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm
                        editTodo={editTask}
                        task={todo}
                        key={todo.id}
                    />
                ) : (
                    <Todo
                        task={todo}
                        key={todo.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        className={animationClass}
                    />
                ),
            )}
        </div>
    );
};
