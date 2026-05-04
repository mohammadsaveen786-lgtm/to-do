const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const filterBtns = document.querySelectorAll(".filters button");

let todos = [];
let currentFilter = "all";

addBtn.addEventListener("click", addTodo);

function addTodo() {
  if (!input.value.trim()) return;

  todos.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  render();
}

function render() {
  list.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = todo.completed ? "completed" : "";

    span.addEventListener("click", () => {
      todo.completed = !todo.completed;
      render();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", todo.text);
      if (newText) {
        todo.text = newText;
        render();
      }
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      render();
    });

    li.append(span, editBtn, delBtn);
    list.appendChild(li);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});