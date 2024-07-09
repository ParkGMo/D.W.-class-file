import React, { useEffect, useState } from "react";

let list = [];

function ListUp() {
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

function ToDoList(props) {
  const [count, setCount] = useState(0);
  const [toDo, setToDo] = useState("");
  const handleClick = (e) => {
    //   e.preventDefault(); --> submit할 때 새로고침을 막는다.
    e.preventDefault();
    setCount(count + 1);
    if (toDo == "") {
      return false;
    }
    list.push(toDo);
    setToDo("");
  };
  const handleChange = (e) => {
    setToDo(e.target.value);
  };
  const handleDelete = (e) => {
    if (list.length == 0) {
      return false;
    }
    list.pop();
  };

  return (
    <div>
      <h1>MY To Do! ({list.length})</h1>
      <form onSubmit={handleClick}>
        <input onChange={handleChange} value={toDo} />
        <button>Add To Do</button>
        <button onClick={handleDelete}>Delete To Do</button>
      </form>
      <hr />
      <ListUp />
      {/* <ul>
        <li>ToDo1</li>
        <li>ToDo2</li>
        <li>ToDo3</li>
      </ul> */}
    </div>
  );
}

export default ToDoList;
