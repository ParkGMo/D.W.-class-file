import { useState } from "react";
import "./Rsp-index.css";
import "./Rsp-App.css";
import "./Handicon.css";
import reset from "./assets/ic-reset.svg";
import Handicon from "./Handicon.js";
import HandButton from "./HandButton.js";
import { generateRandomHand } from "./utils.js";

function App() {
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  // value -> HandButton.js의 prop에서 가져온다.
  const handleButtonClick = (value) => {
    // 사용자가 클릭한 가위바위보 가져옴
    setHand(value);
    // 상대의 가위바위보 랜덤으로 추출
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    // 승패 결정 == 배점을 곱해서 점수 추출
  };
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보!</h1>
      <img className="App-reset" src={reset} />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-Box">
        {/* 가위바위보 내는 곳 */}
        <div className="App-hands">
          <div className="Hand">
            <Handicon className="Hand-icon" value={hand} />
          </div>
          <div className="App-versus">vs</div>
          <div className="Hand">
            <Handicon className="Hand-icon" value={otherHand} />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input type="number" min={1} max={9} />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>승리, 패배, 무승부</p>
        </div>
      </div>
      <div>
        {/* 변수나 함수를 prop으로 전달 가능 */}
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
