"use strict";
let todos = [];
let currentEditId = null;
const taskList = document.getElementById("taskList");
const noTaskMessage = document.getElementById("noTaskMessage");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEdit");
const closeModal = document.getElementById("closeModal");
const cancelEditBtn = document.getElementById("cancelEdit");
const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.onclick = handleAddTask;
function updateNoTaskMessage() {
    noTaskMessage.style.display = todos.length === 0 ? "block" : "none";
}
function renderTodos() {
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
        if (todo.completed)
            taskSpan.classList.add("done");
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
function addTask(text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false,
    };
    todos.push(newTodo);
    renderTodos();
}
function editTask(id, newText) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.text = newText;
        renderTodos();
    }
}
function deleteTask(id) {
    todos = todos.filter((t) => t.id !== id);
    renderTodos();
}
function toggleTask(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}
function handleAddTask() {
    const taskInput = document.getElementById("taskInput");
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
window.onclick = (e) => {
    if (e.target === editModal) {
        editModal.style.display = "none";
    }
};
renderTodos();
// For console testing
window.todos = todos;
window.addTask = addTask;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;
window.renderTodos = renderTodos;
