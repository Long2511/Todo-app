import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) {
            setError(true);
        } else {
            editTodo(value, description, task.id);
        }
    };
    const formStyle = {
        flex: 1,
        borderRadius: '5px',
        backgroundColor: '#ffffff',
        padding: '10px',
        marginBottom: '10px',
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div style={formStyle}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="todo-input-update"
                    placeholder="Update task"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="todo-input-update description"
                    placeholder="Update description"
                />
                {error && (
                    <p className="error-message">
                        Title of the task can not be empty
                    </p>
                )}
                <button type="submit" className="add-todo-btn">
                    Update
                </button>
            </div>
        </form>
    );
};
