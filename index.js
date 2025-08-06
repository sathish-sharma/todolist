const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

let items = [];
let alertMessage = null;

app.get("/", (req, res) => {
  res.render("list", { ejes: items, alert: alertMessage });
  alertMessage = null;
});

app.post("/", (req, res) => {
  const item = req.body.ele1.trim();
  if (!item) {
    alertMessage = "empty";
    return res.json({ success: false });
  }
  items.push(item);
  alertMessage = "added";
  res.json({ success: true });
});

app.put("/edit", (req, res) => {
  const { oldTask, newTask } = req.body;
  const index = items.indexOf(oldTask);
  if (index !== -1 && newTask.trim()) {
    items[index] = newTask.trim();
    alertMessage = "updated";
    res.json({ success: true });
  } else {
    alertMessage = "empty";
    res.json({ success: false });
  }
});

app.delete("/delete", (req, res) => {
  const { task } = req.body;
  const index = items.indexOf(task);
  if (index !== -1) {
    items.splice(index, 1);
    alertMessage = "deleted";
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
