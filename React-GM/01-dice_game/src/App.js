import "./App.css";
import logo from "./assets/logo.png";
import Board from "./Board.js";

// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든 것 (변수형으로 만들 수 있다.)
// 함수형 컴포넌트를 만들때는 함수명의 첫 글자는 반드시 대문자여야 한다.
// 함수형 컴포넌트 안에서는 JSX문법으로 만든 리액트 엘리먼트를 리턴해줘야한다.

const style = {
  backgroundColor: "#d9d9d9",
  color: "yellow",
};

// for ==> htmlFor, onclick/onblur ==> onClick/onBlur,
function App() {
  return (
    // <div className="App" style="color: red;">  -- X
    // <div className="App" style={{ color: "red" }}> -- O
    // <div className="App" style={style}>Hello, React!!</div>
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">주사위게임</h1>
        <div>
          <button className="App-button blue">던지기</button>
          <button className="App-button red">처음부터</button>
        </div>
      </div>
      <div className="App-boards">
        <Board />
        <Board />
      </div>
    </div>
  );
}

export default App;
