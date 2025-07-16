import React from 'react';

type TodoFormProps = {
  newTodo: string;
  setNewTodo: (value: string) => void;
  handleAddTodo: () => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ newTodo, setNewTodo, handleAddTodo }) => {
  return (
    <div className="input-section">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoForm;
