import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            addTodo(value, description, dueDate);
            setValue('');
            setDescription('');
            setError(false);
            setDueDate('');
        } else {
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div className="form-style-row">
                <div>
                    <div>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="todo-input"
                            placeholder="What is on your mind?"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="todo-input description"
                            placeholder="Add a description"
                        />
                    </div>
                    <div>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            min={formattedToday}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="todo-input"
                        />
                    </div>
                    {error && (
                        <p className="error-message">Title can not be empty</p>
                    )}
                </div>

                <div>
                    <button type="submit" className="add-todo-btn">
                        Add Task
                    </button>
                </div>
            </div>
        </form>
    );
};
