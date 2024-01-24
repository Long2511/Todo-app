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
                    </div>

                    <div style={style} className={'btn-container'}>
                        {!task.completed && (
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
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

Todo.displayName = 'Todo';
export default React.memo(Todo);
