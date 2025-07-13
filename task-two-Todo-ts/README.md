# 📝 Todo List App (TypeScript)

A simple and responsive **Todo List Web Application** that allows users to:

- Add tasks
- Mark tasks as completed
- Edit existing tasks in a modal popup
- Delete tasks
- View a dynamic message when no tasks are present

This project is built using **TypeScript**, **HTML**, and **CSS** — compiled into plain JavaScript. 
No frameworks or external libraries required.

---

## 🚀 Getting Started

### ✅ Requirements
- Node.js and TypeScript 
- A modern web browser (Chrome, Firefox, Edge, etc.)
- A local server like **Live Server** or VS Code


### 📦 Run Locally

1. Clone this repository or download the ZIP:
    ```bash
    git clone https://github.com/BeamSol/A2SV-Web-Project-Phase.git
    ```

2. Navigate to the project directory:
    ```bash
    cd task-two-Todo-ts
    ```

3. Compile TypeScript:
    ```bash
    tsc
    ```
    This compiles `src/todo.ts` to `dist/todo.js`

4. Open `index.html` in your browser  
   OR  
   Use a local server like **Live Server** (VS Code extension) for best experience.

---

## 📷 Screenshots

### 🔹 Home Page – No Tasks Yet
Displays a message when there are no tasks.

![No Task Page Screenshot](screenshots/no-tasks.png)
> *The app displays "No tasks yet." message when the task list is empty.*

---

### 🔹 Add New Task
User adds a new task using the input field.

![Add Task Screenshot](screenshots/add-task.png)
> *User can type and click "Add Task" to append a new item.*

---

### 🔹 Mark Task as Done
Checkbox toggles task completion with a line-through.

![Done Task Screenshot](screenshots/mark-done.png)
> *Tasks marked as completed get a line-through style and dimmed color.*

---

### 🔹 Edit Task – Modal Popup
Clicking edit opens a modal to update the task.

![Edit Modal Screenshot](screenshots/edit-modal.png)
> *Tasks can be edited via a popup modal with Save and Cancel options.*

---

### 🔹 After Edit Task 
Clicking save on a modal to update the task.

![After Edit Modal Screenshot](screenshots/after-edit.png)
> *Tasks can be edited via a popup modal with Save and Cancel options.*

---

### 🔹 Delete Task
Tasks can be removed from the list by clicking the delete button.

![Delete Task Screenshot](screenshots/delete-task.png)
> *Tasks are removed instantly and "No tasks yet." will reappear if list is empty.*

---

## 📁 Project Structure

```
task-Todo-ts/
│
├── dist/                  # Compiled JavaScript
│   └── todo.js
│
├── public/                # UI files
│   ├── index.html
│   └── style.css
│
├── screenshots/           # Screenshots for README
│   ├── no-tasks.png
│   ├── add-task.png
│   ├── mark-done.png
│   ├── edit-modal.png
│   ├── after-edit.png
│   └── delete-task.png
│
├── src/                   # TypeScript source code
│   └── todo.ts
│
├── README.md
└── tsconfig.json

```

## 🙌 Author

**Beamlak Solomon**  
Software Engineering Student | Frontend Developer 
[LinkedIn](https://www.linkedin.com/in/beamlak-solomon-540890264/) | [GitHub](https://github.com/BeamSol)

---