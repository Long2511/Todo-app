import React, { useState } from 'react';
import FlipMove from 'react-flip-move';

export const EditTodoForm = ({ editTodo, task }) => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const dueDateObj = new Date(task.dueDate);
    const formattedDueDate = isNaN(dueDateObj.getTime()) ? '' : `${dueDateObj.getFullYear()}-${String(dueDateObj.getMonth() + 1).padStart(2, '0')}-${String(dueDateObj.getDate()).padStart(2, '0')}T${String(dueDateObj.getHours()).padStart(2, '0')}:${String(dueDateObj.getMinutes()).padStart(2, '0')}`;

    const [value, setValue] = useState(task.task);
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState(false);
    const [dueDate, setDueDate] = useState(formattedDueDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) {
            setError(true);
        } else {
            editTodo(value, description, dueDate, task.id);
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
        <FlipMove>
            <form onSubmit={handleSubmit} className="TodoForm">
                <div style={formStyle}>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="todo-input"
                        placeholder="Update task"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="todo-input description"
                        placeholder="Update description"
                    />
                    {error && (
                        <p className="error-message">
                            Title of the task can not be empty
                        </p>
                    )}
                    <input
                        type="datetime-local"
                        value={dueDate}
                        min={formattedToday}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="todo-input date-time"
                    />
                    <button type="submit" className="add-todo-btn">
                        Update
                    </button>
                </div>
            </form>
        </FlipMove>
    );
};
