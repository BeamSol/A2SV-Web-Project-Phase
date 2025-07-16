import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TodoService from '../TodoService';
import type { TodoTypes } from '../todo';
import '../css/TodoList.css';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingTodo, setEditingTodo] = useState<TodoTypes | null>(null);
    const [editText, setEditText] = useState<string>('');

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;
        const todo: TodoTypes = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        TodoService.addTodo(todo);
        setTodos([...todos, todo]);
        setNewTodo('');
    };

    const handleUpdateTodo = (todo: TodoTypes) => {
        TodoService.updateTodo(todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        setEditingTodo(null);
        setEditText('');
    };

    const handleDeleteTodo = (id: number) => {
        TodoService.deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleComplete = (todo: TodoTypes) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        TodoService.updateTodo(updatedTodo);
        setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    };

    const handleEditTodo = (todo: TodoTypes) => {
        setEditingTodo(todo);
        setEditText(todo.text);
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
        setEditText('');
    };

    return (
        <div className="todo-list">
            <h2>TODO LIST</h2>
            <TodoForm
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
            />

            <div className="todos-section">
                {todos.length === 0 && <p className="no-tasks">No tasks available</p>}
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo)}
                        />
                        <span onClick={() => handleToggleComplete(todo)}>{todo.text}</span>
                        <div className="icon-buttons">
                            <FaEdit className="icon edit" onClick={() => handleEditTodo(todo)} />
                            <FaTrash className="icon delete" onClick={() => handleDeleteTodo(todo.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {editingTodo && (
                <div className="popup">
                    <h3>Edit Todo</h3>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit todo"
                    />
                    <div className="popup-buttons">
                        <button onClick={() => handleUpdateTodo({ ...editingTodo, text: editText })}>
                            Update
                        </button>
                        <button className="cancel" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
