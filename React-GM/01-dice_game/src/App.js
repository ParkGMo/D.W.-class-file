import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Board from "./Board.js";

// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든 것 (변수형으로 만들 수 있다.)
// 함수형 컴포넌트를 만들때는 함수명의 첫 글자는 반드시 대문자여야 한다.
// 함수형 컴포넌트 안에서는 JSX문법으로 만든 리액트 엘리먼트를 리턴해줘야한다.

// for ==> htmlFor, onclick/onblur ==> onClick/onBlur,

function random(n) {
  return Math.ceil(Math.random() * n);
}
function App() {
  // * State *
  // 던지기 버튼을 누르면 하면에서 주사위 이미지가 바뀌어야한다.
  // 순수 자바스크립트로 작성한다면 주사위 이미지마다 화면을 만들거나, 비동기로 화면에 요소를 추가, 삭제 하는 코드를 작성해야한다.
  // 리액트에서는 State라는 것을 사용한다.
  // ⭐이 State가 바뀔 때마다⭐ 리액트가 알아서 화면을 새로 렌더링 해준다.
  const [myNum, setMyNum] = useState(1); // (1)은 초기값!
  const [otherNum, setOtherNum] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [otherGameHistory, setOtherGameHistory] = useState([]);
  // 초기값으로 값을 바꾸려면 두번째 함수로 바뀐 것을 확인한다.
  // console.log(gameHistory);
  // console.log(otherGameHistory);

  const handleRollClick = () => {
    // 주사위 랜덤 숫자 뽑기
    const nextMyNum = random(6);
    const nextOtherNum = random(6);
    // 기록 추가
    // gameHistory.push(nextMyNum);
    // otherGameHistory.push(nextOtherNum);
    // -> 두번째 함수에 넣어주어야 바뀌는 것을 알게된다.
    // setGameHistory([nextMyNum]);
    // setOtherGameHistory([nextOtherNum]);
    setGameHistory([...gameHistory, nextMyNum]);
    setOtherGameHistory([...otherGameHistory, nextOtherNum]);
  };

  const handleClearClick = () => {
    setGameHistory([]);
    setOtherGameHistory([]);
  };
  return (
    // <div className="App" style="color: red;">  -- X
    // <div className="App" style={{ color: "red" }}> -- O
    // <div className="App" style={style}>Hello, React!!</div>
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">주사위게임</h1>
        <div>
          <button className="App-button blue" onClick={handleRollClick}>
            던지기
          </button>
          <button className="App-button red" onClick={handleClearClick}>
            처음부터
          </button>
        </div>
      </div>
      <div className="App-boards">
        <Board name="나" color="blue" gameHistory={gameHistory} />
        <Board name="상대" color="red" gameHistory={otherGameHistory} />
      </div>
    </div>
  );
}

export default App;
