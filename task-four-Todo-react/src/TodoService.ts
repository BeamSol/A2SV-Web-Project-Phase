import type { TodoTypes } from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
    getTodos: (): TodoTypes[] => {
        const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todos ? JSON.parse(todos) : [];
    },

    addTodo: (todo: TodoTypes) => {
        const todos = TodoService.getTodos();
        todos.push(todo);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },

    updateTodo: (updatedTodo: TodoTypes) => {
        const todos = TodoService.getTodos().map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },

    deleteTodo: (id: number) => {
        const todos = TodoService.getTodos().filter(todo => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
};

export default TodoService;