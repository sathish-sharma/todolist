const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

let items = [];

app.get("/", (req, res) => {
  res.render("list", { ejes: items });
});

app.post("/", (req, res) => {
  const item = req.body.ele1;
  if (!item) {
    return res.json({ success: false });
  }
  items.push(item);
  res.json({ success: true });
});

app.put("/edit", (req, res) => {
  const { oldTask, newTask } = req.body;
  const index = items.indexOf(oldTask);
  if (index !== -1 && newTask) {
    items[index] = newTask;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.delete("/delete", (req, res) => {
  const { task } = req.body;
  const index = items.indexOf(task);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});