const express = require("express");
const app = express();

const fs = require("fs")
const dataTodo = fs.readFileSync("todos.json")
let listTodo = JSON.parse(dataTodo)

const bodyParser = require("body-parser");
const cors = require("cors");
const { validation } = require("../middlewale/middlewale");


app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); 
// lấy api về

app.get("/api/v1/todos", (req, res) => {
  
    const {per_page} = req.query ;
    const newData = listTodo.slice(0,per_page)
    res.status(200).json({
    message : "Thànhh công",
    data: newData,
  })
})
// thêm công việc
app.post("/api/v1/todos", validation,  (req, res) => {
  console.log(req.body);
  listTodo.unshift(req.body)
  fs.writeFileSync("todos.json", JSON.stringify(listTodo))
  res.status(200).json({
    message : "Thêm thanh cong",
    data: listTodo
  })
})

// xóa  công  việc 
app.delete("/api/v1/todos/:id", (req, res) => {
  const {id} = req.params;
  // console.log(id);
  // console.log(listTodo);
  const index = listTodo.findIndex(item => item.id == id)
  // console.log(index);
  listTodo.splice(index, 1)
  fs.writeFileSync("todos.json",JSON.stringify(listTodo))
  res.status(200).json({
    message: "xoá thành công",
    data: listTodo
  })
})

// xoá hết công việc
app.delete("/api/v1/todos", (req, res) => {
  listTodo = []
  fs.writeFileSync("todos.json",JSON.stringify(listTodo))
  res.status(200).json({
    message: "xoá hết thanh cong",
    data: listTodo
  })
})

// sửa trạng thái compelte
app.put("/api/v1/todos/:id", (req, res) => {
  const {id} = req.params
  
  const index = listTodo.findIndex(item => item.id == id)
   listTodo[index] = {...req.body, completed : true }
   fs.writeFileSync("todos.json",JSON.stringify(listTodo));
   res.status(200).json({
    message: "cập nhật thanh cong",
    data: listTodo
  })
}) 
app.listen(7000, () => {
  console.log("dang chay cong 6000");
})