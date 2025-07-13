interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentEditId: number | null = null;

const taskList = document.getElementById("taskList") as HTMLUListElement;
const noTaskMessage = document.getElementById("noTaskMessage") as HTMLParagraphElement;
const editModal = document.getElementById("editModal") as HTMLElement;
const editInput = document.getElementById("editInput") as HTMLInputElement;
const saveEditBtn = document.getElementById("saveEdit") as HTMLButtonElement;
const closeModal = document.getElementById("closeModal") as HTMLElement;
const cancelEditBtn = document.getElementById("cancelEdit") as HTMLButtonElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
addTaskBtn.onclick = handleAddTask;

function updateNoTaskMessage(): void {
  noTaskMessage.style.display = todos.length === 0 ? "block" : "none";
}

function renderTodos(): void {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "task-checkbox";
    checkbox.onchange = () => {
      toggleTask(todo.id);
    };

    const taskSpan = document.createElement("span");
    taskSpan.textContent = todo.text;
    taskSpan.className = "task-text";
    if (todo.completed) taskSpan.classList.add("done");

    const btnContainer = document.createElement("div");
    btnContainer.className = "buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      currentEditId = todo.id;
      editInput.value = todo.text;
      editModal.style.display = "block";
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(todo.id);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(btnContainer);

    taskList.appendChild(li);
  });

  updateNoTaskMessage();
}

function addTask(text: string): void {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
}

function editTask(id: number, newText: string): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = newText;
    renderTodos();
  }
}

function deleteTask(id: number): void {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

function toggleTask(id: number): void {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function handleAddTask(): void {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const text = taskInput.value.trim();
  if (!text) {
    alert("Please enter a task.");
    return;
  }
  addTask(text);
  taskInput.value = "";
}

saveEditBtn.onclick = () => {
  const text = editInput.value.trim();
  if (currentEditId !== null && text) {
    editTask(currentEditId, text);
    currentEditId = null;
    editModal.style.display = "none";
  }
};

cancelEditBtn.onclick = () => {
  editModal.style.display = "none";
  currentEditId = null;
};

closeModal.onclick = () => {
  editModal.style.display = "none";
};

window.onclick = (e: MouseEvent) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
};

renderTodos();

// For console testing
(window as any).todos = todos;
(window as any).addTask = addTask;
(window as any).editTask = editTask;
(window as any).deleteTask = deleteTask;
(window as any).toggleTask = toggleTask;
(window as any).renderTodos = renderTodos;
