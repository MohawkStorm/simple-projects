const addBtn = document.querySelector(".add-button");
const userTextInput = document.querySelector(".todo-input");
const userDateInput = document.querySelector(".todo-date");

let todoList = loadFromStorage() || [];

function nextId() {
  if (todoList.length === 0) {
    return 1;
  } else {
    return Math.max(...todoList.map((todo) => todo.id)) + 1;
  }
}

// Codes for localStorage

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadFromStorage() {
  return JSON.parse(localStorage.getItem("todoList"));
}

function renderLocalTodoList() {
  document.querySelector(".todo-list").innerHTML = "";
  todoList.forEach(({ id, name, date }) => {
    generateTodoHTML(id, name, date);
  });
}

renderLocalTodoList();

// Generates html

function generateTodoHTML(id, name, date) {
  let html = `<div class="todo-item" data-id="${id}">
    <div class="todo-text">${name}</div>
    <input type="text" class="edit-input" style="display:none;">
    <div class="todo-date">${date}</div>
    <input type="date" class="edit-date" style="display:none;">
    <div class="todo-actions">
        <button class="edit-button" data-id="${id}">Edit</button>
        <button class="delete-button" data-id="${id}">Delete</button>
    </div>
  </div>`;

  document.querySelector(".todo-list").innerHTML += html;
}

// Clears error css from inputs

window.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (
    clickedElement !== userTextInput &&
    clickedElement !== userDateInput &&
    !clickedElement.classList.contains("add-button")
  ) {
    userTextInput.classList.remove("input-error");
    userDateInput.classList.remove("input-error");
  }
});

// New ToDo entry with error handling + Add button function

function newTodo() {
  let userTextValue = userTextInput.value.trim();
  let userDateValue = userDateInput.value;
  const id = nextId();
  todoList.push({
    id,
    name: userTextValue,
    date: userDateValue,
  });
  generateTodoHTML(id, userTextValue, userDateValue);
  saveToStorage();
}

addBtn.addEventListener("click", () => {
  if (userTextInput.value.trim() === "" || userDateInput.value.trim() === "") {
    userTextInput.value.trim() === ""
      ? userTextInput.classList.add("input-error")
      : userTextInput.classList.remove("input-error");
    userDateInput.value.trim() === ""
      ? userDateInput.classList.add("input-error")
      : userDateInput.classList.remove("input-error");

    return;
  } else {
    userTextInput.classList.remove("input-error");
    userDateInput.classList.remove("input-error");
    newTodo();
    userTextInput.value = "";
  }
});

// Delete button

document.querySelector(".todo-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    let deleteId = event.target.dataset.id;

    todoList = todoList.filter((todo) => todo.id !== Number(deleteId));
    const todoParent = event.target.closest(".todo-item");
    if (todoParent) todoParent.remove();
    saveToStorage();
  }
});

// Edit button

document.querySelector(".todo-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const editId = event.target.dataset.id;
    const indexTodo = todoList.findIndex((todo) => todo.id === Number(editId));
    let selectedText = todoList[indexTodo].name;
    let selectedDate = todoList[indexTodo].date;
    const todoParent = event.target.closest(".todo-item");
    let editBtn = todoParent.querySelector(".edit-button");

    const mainTodoText = todoParent.querySelector(".todo-text");
    const mainTodoDate = todoParent.querySelector(".todo-date");

    const editTodoText = todoParent.querySelector(".edit-input");
    const editTodoDate = todoParent.querySelector(".edit-date");

    if (editBtn.textContent === "Edit") {
      editBtn.textContent = "Save";
      mainTodoText.style.display = "none";
      mainTodoDate.style.display = "none";
      editTodoText.style.display = "inline-block";
      editTodoDate.style.display = "inline-block";

      selectedText = todoList[indexTodo].name;
      selectedDate = todoList[indexTodo].date;

      editTodoText.value = selectedText;
      editTodoDate.value = selectedDate;
    } else {
      editBtn.textContent = "Edit";

      const newText = editTodoText.value.trim();
      const newDate = editTodoDate.value;

      if (newText !== "") {
        mainTodoText.textContent = newText;
        todoList[indexTodo].name = newText;
      }
      if (newDate !== "") {
        mainTodoDate.textContent = newDate;
        todoList[indexTodo].date = newDate;
      }

      mainTodoText.style.display = "inline-block";
      mainTodoDate.style.display = "inline-block";
      editTodoText.style.display = "none";
      editTodoDate.style.display = "none";
    }
    saveToStorage();
  }
});
