import { useEffect, useState } from "react";
import "./App.css";
import Cleanup from "./Cleanup";
import ToDoList from "./ToDoList";
import MovieApp from "./MovieApp";

function App() {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("");

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log(
      "나는 화면이 최초로 랜더링될 때 실행되는 uef야~~~~~~~~~~~~~~~~"
    );
  }, []); // [](디펜던시 리스트) 안에는 react 가 무엇을 지켜볼지 작성해준다.
  // * 최초랜더링은 무조건 실행

  useEffect(() => {
    console.log("나는 카운터가 변경될 때 실행되는 uef야~~~~~~~~~~~~~~~~");
  }, [counter]);

  useEffect(() => {
    console.log("나는 텍스트가 변경될 때 실행되는 uef야~~~~~~~~~~~~~~~~");
  }, [input]);

  return (
    <div className="App">
      {/* <input
        type="text"
        placeholder="Search here"
        onChange={(e) => console.log(e.target.value)}
      /> */}
      {/* <input type="text" placeholder="Search here" onChange={handleChange} />
      <h2>입력한 값 : {input}</h2>
      <h1>{counter}</h1>
      <button onClick={handleClick}>Click me</button>
      <hr />
      <Cleanup />
      <hr />
      <ToDoList />
      <hr /> */}
      <MovieApp />
    </div>
  );
}
export default App;
