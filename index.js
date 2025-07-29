const express = require("express");
const bodyParser = require("body-parser");
 var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var items =[];
 app.get("/", function(req, res) {
res.render("list",{ejes :items})
 });

app.post("/",function(req,res){
    var item =req.body.ele1;
   items.push(item);
   res.status(200).json({ success: true});
});

app.delete("/delete", function (req, res) {
  const taskToDelete = req.body.task;
  items = items.filter(item => item !== taskToDelete);
  res.status(200).json({ success: true });
});

app.put("/edit", function(req, res) {
  const { oldTask, newTask } = req.body;
  const index = items.indexOf(oldTask);
  if (index !== -1) {
    items[index] = newTask;
    return res.status(200).json({ success: true });
  }
});
 app.listen(4000, function(){
 console.log("Server started on port 4000");
 });