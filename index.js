const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get("/", (req, res) => {
  const { priority } = req.query;
  const filteredTodos = priority ? todos.filter(t => t.priority === priority) : todos;
  res.render("list", { todos: filteredTodos });
});

app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (task.trim() === "") {
    return res.send(`<script>alert("Task cannot be empty."); window.location.href="/";</script>`);
  }
  todos.push({ id: Date.now(), task, priority });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = Number(req.body.id);
  todos = todos.filter(t => t.id !== id);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const { id, newTask } = req.body;
  const todo = todos.find(t => t.id === Number(id));
  if (todo && newTask.trim()) {
    todo.task = newTask;
  }
  res.redirect("/");
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
