import { useState } from "react";
import "./rsp-App.css";
import rock from "./assets/rock.svg";
import scissor from "./assets/scissor.svg";
import paper from "./assets/paper.svg";
import RspVersusIcon from "./RspVersusIcon.js";

function App() {
  return (
    <div className="rsp-App">
      <h1>가위 바위 보!</h1>
      <div className="socre-block">
        <div className="score-rsp my-rsp">0</div>
        <div className="dots">
          <div>●</div>
          <div>●</div>
        </div>
        <div className="score-rsp other-rsp">0</div>
      </div>
      <RspVersusIcon />
      <div className="score-batting">
        <p className="batting-word">
          배점
          <input type="number" min="1" max="500" placeholder="1 ~ 500" /> 점
        </p>
      </div>
      <button className="rsp-btn"> 승부기록! </button>
      <div className="rsp-icons">
        <img className="rsp-icon rock" src={rock} />
        <img className="rsp-icon scissor" src={scissor} />
        <img className="rsp-icon papper" src={paper} />
      </div>
    </div>
  );
}

export default App;
