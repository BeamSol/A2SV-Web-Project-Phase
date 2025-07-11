const taskList = document.getElementById("taskList");
const noTaskMessage = document.getElementById("noTaskMessage");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEdit");
const closeModal = document.getElementById("closeModal");
const cancelEditBtn = document.getElementById("cancelEdit");

let currentTaskSpan = null;

function updateNoTaskMessage() {
  noTaskMessage.style.display = taskList.children.length === 0 ? "block" : "none";
}

function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.className = "task-text";

  checkbox.onchange = () => {
    taskSpan.classList.toggle("done", checkbox.checked);
  };

  const btnContainer = document.createElement("div");
  btnContainer.className = "buttons";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    currentTaskSpan = taskSpan;
    editInput.value = taskSpan.textContent;
    editModal.style.display = "block";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    updateNoTaskMessage();
  };

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(btnContainer);

  taskList.appendChild(li);
  document.getElementById("taskInput").value = "";
  updateNoTaskMessage();
}

saveEditBtn.onclick = () => {
  if (currentTaskSpan && editInput.value.trim()) {
    currentTaskSpan.textContent = editInput.value.trim();
  }
  editModal.style.display = "none";
};

cancelEditBtn.onclick = () => {
  editModal.style.display = "none";
  currentTaskSpan = null;
};

closeModal.onclick = () => {
  editModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
};

updateNoTaskMessage();
