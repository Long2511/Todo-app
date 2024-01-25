import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

let initialState = { todos: [], filter: 'all', sortOrder: 'pending' };
let existingState = localStorage.getItem('todos');
try {
    existingState = existingState ? JSON.parse(existingState) : initialState;
    existingState.filter = 'all'
    existingState.sortOrder = 'pending'
    console.log(existingState);
} catch (error) {
    existingState = initialState;
}
initialState = existingState;

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: uuidv4(),
                task: action.payload.task,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                completed: false,
                isEditing: false,
            };

            let existingTodos = localStorage.getItem('todos');
            try {
                existingTodos = existingTodos ? JSON.parse(existingTodos) : [];
            } catch (error) {
                existingTodos = [];
            }
            if (Array.isArray(existingTodos)) {
                existingTodos.push(newTodo);
                localStorage.setItem('todos', JSON.stringify(existingTodos));
            }

            if (!Array.isArray(state.todos)) {
                state.todos = [];
            }
            state.todos.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos[index].completed = !state.todos[index].completed;
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos[index].isEditing = !state.todos[index].isEditing;
        },
        editTask: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index] = {
                ...state.todos[index],
                task: action.payload.task,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                isEditing: !state.todos[index].isEditing,
            };
        },
        setTodos: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.todos = action.payload;
                localStorage.setItem('todos', JSON.stringify(state));
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload
            localStorage.setItem('todos', JSON.stringify(state));
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
            localStorage.setItem('todos', JSON.stringify(state));
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo, editTodo, editTask, setTodos, setSortOrder, setFilter } = todosSlice.actions;

export default todosSlice.reducer;