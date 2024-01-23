import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export const Todo = ({
    task,
    deleteTodo,
    editTodo,
    toggleComplete,
    className,
}) => {
    return (
        <div
            className={`Todo ${className}`}
            onClick={() => toggleComplete(task.id)}
        >
            <p className={`${task.completed ? 'completed' : 'incompleted'}`}>
                {task.task}
            </p>
            <div>
                <FaEdit
                    className="edit-icon"
                    onClick={() => editTodo(task.id)}
                />
                <FaTrashAlt
                    className="delete-icon"
                    onClick={() => deleteTodo(task.id)}
                />
            </div>
        </div>
    );
};
