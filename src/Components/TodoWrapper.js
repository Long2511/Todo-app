import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
    setTodos,
    setFilter,
    setSortOrder,
} from '../redux/todosSlice';

import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { FormControl } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FlipMove from 'react-flip-move';
import SortAndFilter from './SortAndFilter';

export const TodoWrapper = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const addTodoHandler = (task, description, dueDate) => {
        dispatch(addTodo({ task, description, dueDate }));
    };

    const toggleCompleteHandler = (id) => {
        dispatch(toggleComplete(id));
    };

    const deleteTodoHandler = (id) => {
        dispatch(deleteTodo(id));
    };

    const editTodoHandler = (id) => {
        dispatch(editTodo(id));
    };

    const editTaskHandler = (task, description, dueDate, id) => {
        dispatch(editTask({ task, description, dueDate, id }));
    };
    const updateTodos = (newTodos) => {
        dispatch(setTodos(newTodos));
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const filterTodos = () => {
        let filteredTodos = [];
        if (Array.isArray(todos.todos)) {
            switch (todos.filter) {
                case 'completed':
                    filteredTodos = todos.todos.filter(
                        (todo) => todo.completed,
                    );
                    break;
                case 'pending':
                    filteredTodos = todos.todos.filter(
                        (todo) => !todo.completed,
                    );
                    break;
                default:
                    filteredTodos = todos.todos;
            }
            switch (todos.sortOrder) {
                case 'completed':
                    return [...filteredTodos].sort(
                        (a, b) => b.completed - a.completed,
                    );
                case 'pending':
                    return [...filteredTodos].sort(
                        (a, b) => a.completed - b.completed,
                    );
                default:
                    return filteredTodos;
            }
        }
        return filteredTodos;
    };
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todos.todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        if (items) {
            updateTodos(items);
        }
    };

    const renderTodoItem = (todo) => {
        if (todo.isEditing) {
            return (
                <EditTodoForm
                    editTodo={editTaskHandler}
                    task={todo}
                    key={todo.id}
                />
            );
        } else {
            return (
                <Todo
                    task={todo}
                    key={todo.id}
                    toggleComplete={toggleCompleteHandler}
                    deleteTodo={deleteTodoHandler}
                    editTodo={editTodoHandler}
                />
            );
        }
    };

    const renderDraggableTodo = (todo, index) => {
        return (
            <CSSTransition key={todo.id} timeout={500} classNames="fade">
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {renderTodoItem(todo)}
                        </div>
                    )}
                </Draggable>
            </CSSTransition>
        );
    };
    useEffect(() => {
        const loadedTodos = localStorage.getItem('todos');
        if (loadedTodos) {
            dispatch(setTodos(JSON.parse(loadedTodos)));
        }
    }, []);

    useEffect(() => {
        const loadedTodos = localStorage.getItem('todos');
        if (loadedTodos) {
            dispatch(setTodos(JSON.parse(loadedTodos)));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (todos.filter === 'all') {
            dispatch(setSortOrder('pending'));
        }
    }, [todos.filter, dispatch]);

    return (
        <div className="TodoWrapper">
            <FormControl>
                <h1>Today is a great day!</h1>
                <TodoForm addTodo={addTodoHandler} />
                <SortAndFilter
                    filter={todos.filter}
                    setFilter={(filter) => dispatch(setFilter(filter))}
                    setSortOrder={(sortOrder) =>
                        dispatch(setSortOrder(sortOrder))
                    }
                />{' '}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="drag-and-drop-contain">
                        {(provided) => (
                            <div
                                className="drag-and-drop-contain"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <TransitionGroup>
                                    <FlipMove>
                                        {todos &&
                                            filterTodos().map(
                                                renderDraggableTodo,
                                            )}
                                    </FlipMove>
                                </TransitionGroup>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </FormControl>
        </div>
    );
};
