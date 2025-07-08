const todoInput = document.querySelector(".todoInput");
const todoDateInput = document.querySelector(".todoDateInput");
const addBtn = document.querySelector(".addBtn");
const todoList = document.querySelector(".todoList");

let todoArray = [];

function renderTodoDisplay() {
  todoList.innerHTML = "";
  for (let i = 0; i < todoArray.length; i++) {
    todoList.innerHTML += `<p>
  <span class="todoName">${todoArray[i].name}</span>
  <span class="todoDate">${todoArray[i].date}</span>
  <button class="deleteBtn" onclick="deleteFromList(${i})">Delete</button>
</p>`;
  }
}

function deleteFromList(i) {
  todoArray.splice(i, 1);
  renderTodoDisplay();
}

function getTodoList() {
  let todoValue = todoInput.value.trim();
  let todoDateValue = todoDateInput.value;

  if (!todoValue && !todoDateValue) {
    alert("Please enter a task and select a date");
    todoDateInput.classList.add("error");
    todoInput.classList.add("error");
  } else if (!todoDateValue) {
    alert("Please choose a date for your task");
    todoInput.classList.remove("error");
    todoDateInput.classList.add("error");
  } else if (!todoValue) {
    alert("The task description can't be empty");
    todoDateInput.classList.remove("error");
    todoInput.classList.add("error");
  } else if (todoValue && todoDateValue) {
    todoDateInput.classList.remove("error");
    todoInput.classList.remove("error");

    todoArray.push({
      name: todoValue,
      date: todoDateValue,
    });
    renderTodoDisplay();
    todoInput.value = "";
  }
}

todoInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    getTodoList();
  }
};

addBtn.addEventListener(`click`, () => {
  getTodoList();
});
