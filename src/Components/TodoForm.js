import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            addTodo(value, description);
            setValue('');
            setDescription('');
            setError(false);
        } else {
            setError(true);
        }
    };

    const formStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 5,
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div style={formStyle}>
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
