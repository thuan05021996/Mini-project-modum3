import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import "./App.css"
import axios from "axios";
import Loading from "./Loading";

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [newTodo, setNewTodo] = useState({
    
  });
  const [flag, setFlag] = useState(false);
  const [loading,setLoading]= useState(false);


  const handleData = () => {
    try {
      setLoading(true);
      setTimeout(async() => {
        const res = await axios.get("http://localhost:7000/api/v1/todos?per_page=5")
        setListTodo(res.data.data);
        setLoading(false)
      }, 1500)
    } catch (error) {
    console.log(error);
    }

  }
  useEffect(() => {
    handleData()
  }, [flag])

  // thêm
  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:7000/api/v1/todos", {
        ...newTodo,
        completed: false,
        id: Math.floor(Math.random() * 10000000000),
        userId: 11
      })
      setNewTodo({
        title: ""
      })
      setFlag(!flag)
    } catch (error) {
      alert(error.response.data.messange);
    }
  }

  // xoá

  const handleDelete = async (id) => {
    if (confirm("Bạn có muốn xóa không ?")) {
      try {
        const res = await axios.delete(`http://localhost:7000/api/v1/todos/${id}`)
        setFlag(!flag)
      } catch (error) {
        console.log(error);
      }
    }
  }

  //  XOÁ HÊT CÁC DỮ LIỆU
  const handleDeleteAll = async () => {
    if (confirm("Bạn có muốn xóa hết không ?")) {
      try {
        const res = await axios.delete(`http://localhost:7000/api/v1/todos`)
        setFlag(!flag)
      } catch (error) {
        console.log(error);
      }
    }
  }
  //  thay đổi trạng thái compelted
  const handleEdit = async (item) => {
    try {
      const res = await axios.put(`http://localhost:7000/api/v1/todos/${item.id}`, {
        ...item,
        completed: !item.completed
      })
      setFlag(!flag)
    } catch (error) {
      console.log(error);
    }
  }
  //  nhữn công việc chưa hoàn thành
  let unfinished = listTodo.filter(item => item.completed == false)
 /*  console.log(unfinished); */
  return (
    <div className="div_body">
      <div style={{ marginLeft: "650px", marginTop: "100px" }}>
        <h1>TODOLIST</h1>
      </div>
      <div style={{ display: "flex" }}>
        <Input
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, [e.target.name]: e.target.value })}
          name="title"
          placeholder="Add new "
          style={{ width: "390px", marginLeft: "500px", marginRight: "10px" }}

        />
        <Button
          onClick={handleAdd}
          style={{ backgroundColor: "#fff" }}>ADD</Button>
          </div>
          <div style={{ marginLeft: "500px", width: "460px" }}>
          {!loading ? <ul
          style={{
            marginTop: "10px",
            listStyle: "none",
            border: "1px solid #ddd",
            borderRadius: "6px",
            height: "auto",
            padding: "8px",
            lineHeight: "30px",
          }}
          >
          
          {listTodo.length > 0 && listTodo.map((item) => (
            <li >
              <p
                onClick={(() => handleEdit(item))}
                style={{ margin: "0", cursor: "pointer", textDecoration: item.completed ? "line-through" : " " }}>{item.title} </p>
              <b
                onClick={() => handleDelete(item.id)}
                style={{ cursor: "pointer", color: "red", }}>Delete</b>
            </li>


          ))}
        </ul>: <div style={{position: 'absolute',marginLeft: '230px', marginTop: '10px', padding:"50px 0"}}>
        <Loading />
        </div> }


      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "460px",
          marginLeft: "500px",
          marginTop: loading ? '100px' : '0px'
        }}
      >
        <p>
          You have <a style={{fontSize:"20px"}}> {unfinished.length}</a> pending tasks
        </p>
        <Button
          onClick={handleDeleteAll}
          style={{ marginTop: "10px" }}>Clear All</Button>
      </div>
    </div>
  )
}

export default App
