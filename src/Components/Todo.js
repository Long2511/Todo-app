import React from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

import { Checkbox } from '@mui/material';

export const Todo = React.memo(
    ({ task, deleteTodo, editTodo, toggleComplete }) => {
        const style = {
            width: '64px',
        };
        const detailsStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        };
        const dueDateObj = new Date(task.dueDate);
        let formattedDueDate = 'No Due Date';
        if (!isNaN(dueDateObj.getTime())) {
            formattedDueDate = dueDateObj.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        const currentDate = new Date();
        const isDue = dueDateObj <= currentDate;
        const dueDateStyle = isDue ? { color: 'red' } : {};

        const renderActionIcons = (task) => {
            if (!task.completed) {
                return (
                    <div>
                        <ModeIcon
                            className="edit-icon"
                            onClick={() => editTodo(task.id)}
                        />
                        <DeleteIcon
                            className="delete-icon"
                            onClick={() => deleteTodo(task.id)}
                        />
                    </div>
                );
            }
            return (
                <div>
                    <DeleteIcon
                        className="delete-icon"
                        onClick={() => deleteTodo(task.id)}
                    />
                </div>
            );
        };

        return (
            <div
                className={`todo ${task.completed ? 'completed' : 'uncompleted'}`}
            >
                <div style={detailsStyles}>
                    <Checkbox
                        onClick={() => toggleComplete(task.id)}
                        checked={task.completed}
                    />

                    <div className={'todo-details'}>
                        <p
                            className={`${task.completed ? 'completed' : 'uncompleted'}`}
                        >
                            {task.task}
                        </p>
                        <p className={'description'}>{task.description}</p>
                        <p className={'due-date'} style={dueDateStyle}>
                            Due: {formattedDueDate}
                        </p>
                    </div>

                    <div style={style} className={'btn-container'}>
                        {renderActionIcons(task)}
                    </div>
                </div>
            </div>
        );
    },
);

Todo.displayName = 'Todo';
export default React.memo(Todo);
