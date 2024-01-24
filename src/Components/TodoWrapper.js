import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import {
    FormControl,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FlipMove from 'react-flip-move';
import SortAndFilter from "./SortAndFilter";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('pending');

    const updateTodos = (newTodos) => {
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

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
        updateTodos(newTodos);

    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );
        updateTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        updateTodos(newTodos);
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
        updateTodos(newTodos);
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

        updateTodos(items);
    };
    const renderTodoItem = (todo) => {
        if (todo.isEditing) {
            return (
                <EditTodoForm
                    editTodo={editTask}
                    task={todo}
                    key={todo.id}
                />
            );
        } else {
            return (
                <Todo
                    task={todo}
                    key={todo.id}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            );
        }
    };

    const renderDraggableTodo = (todo, index) => {
        return (
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
                            {renderTodoItem(todo)}
                        </div>
                    )}
                </Draggable>
            </CSSTransition>
        );
    };

    useEffect(() => {
        try {
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            setTodos(savedTodos);
        } catch (error) {
            console.error('Failed to retrieve todos from localStorage:', error);
        }
    }, []);

    return (
        <div className="TodoWrapper">
            <FormControl>
                <h1>Today is a great day!</h1>
                <TodoForm addTodo={addTodo} />
                <SortAndFilter filter={filter} setFilter={setFilter} setSortOrder={setSortOrder}/>
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
                                        {filterTodos().map(renderDraggableTodo)}
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
