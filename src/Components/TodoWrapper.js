import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('pending');

    const addTodo = (todo, description, dueDate) => {
        const newTodos = [
            {
                id: uuidv4(),
                task: todo,
                description: description,
                dueDate: dueDate,
                completed: false,
                isEditing: false,
                createdAt: Date.now(),
            },
            ...todos,
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

    const editTask = (task, description, dueDate, id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id
                ? {
                      ...todo,
                      task,
                      description,
                      dueDate,
                      isEditing: !todo.isEditing,
                  }
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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div
                        className="TodoWrapper"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <FormControl>
                            <h1>Today is a great day!</h1>
                            <TodoForm addTodo={addTodo} />
                            <div>
                                <RadioGroup
                                    aria-labelledby="radio-buttons-group-label"
                                    defaultValue="all"
                                    name="radio-buttons-group"
                                    row={true}
                                    className="center-radio-group"
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio />}
                                        label="All"
                                        onChange={() => setFilter('all')}
                                    />
                                    <FormControlLabel
                                        value="completed"
                                        control={<Radio />}
                                        label="Completed"
                                        onChange={() => setFilter('completed')}
                                    />
                                    <FormControlLabel
                                        value="pending"
                                        control={<Radio />}
                                        label="Pending"
                                        onChange={() => setFilter('pending')}
                                    />
                                </RadioGroup>
                            </div>
                            {filter === 'all' && (
                                <RadioGroup
                                    aria-labelledby="radio-buttons-group-label"
                                    defaultValue="pending"
                                    name="radio-buttons-group"
                                    row={true}
                                    className="center-radio-group"
                                >
                                    <FormControlLabel
                                        value="pending"
                                        control={<Radio />}
                                        label="Sort by Pending"
                                        onChange={() => setSortOrder('pending')}
                                    />
                                    <FormControlLabel
                                        value="completed"
                                        control={<Radio />}
                                        label="Sort by Completed"
                                        onChange={() =>
                                            setSortOrder('completed')
                                        }
                                    />
                                </RadioGroup>
                            )}
                            <TransitionGroup>
                                {filterTodos().map((todo, index) => (
                                    <CSSTransition
                                        key={todo.id}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <Draggable
                                            key={todo.id}
                                            draggableId={todo.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {todo.isEditing ? (
                                                        <EditTodoForm
                                                            editTodo={editTask}
                                                            task={todo}
                                                            key={todo.id}
                                                        />
                                                    ) : (
                                                        <Todo
                                                            task={todo}
                                                            key={todo.id}
                                                            toggleComplete={
                                                                toggleComplete
                                                            }
                                                            deleteTodo={
                                                                deleteTodo
                                                            }
                                                            editTodo={editTodo}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>

                            {provided.placeholder}
                        </FormControl>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
