import { useState } from "react";
import "./Rsp-App.css";
import rock from "./assets/rock.svg";
import scissor from "./assets/scissor.svg";
import paper from "./assets/paper.svg";

const choices = [rock, scissor, paper];

function random(n) {
  return Math.ceil(Math.random() * n);
}

const randomIcon = () => {
  return choices[random(2)];
};

function App() {
  const initialMyChoice = rock;
  const [myChoice, setMyChoice] = useState(initialMyChoice);
  const [otherChoice, setOtherChoice] = useState(rock);
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [battingPoint, setBattingPoint] = useState(0);

  const handleChoice = (choice) => {
    setMyChoice(choice);
    const otherChoice = randomIcon();
    setOtherChoice(otherChoice);

    if (choice === otherChoice) {
    } else if (
      (choice === rock && otherChoice === scissor) ||
      (choice === scissor && otherChoice === paper) ||
      (choice === paper && otherChoice === rock)
    ) {
      setMyScore(myScore + battingPoint);
    } else {
      setOtherScore(otherScore + battingPoint);
    }

    setGameResult(result);
  };

  const resetGame = () => {
    setMyChoice(initialMyChoice);
    setOtherChoice(rock);
    setMyScore(0);
    setOtherScore(0);
    setBattingPoint(0);
    setGameResult("");
  };

  return (
    <div className="rsp-App">
      <h1>가위 바위 보!</h1>
      <div className="score-block">
        <div className="score-rsp my-rsp">{myScore}</div>
        <div className="dots">
          <div>●</div>
          <div>●</div>
        </div>
        <div className="score-rsp other-rsp">{otherScore}</div>
      </div>
      <div className="rsp-versus-icons">
        <img
          className="rsp-versus-icon myrsp-icon"
          src={myChoice}
          alt="My Choice"
        />
        <p className="vs-word">VS</p>
        <img
          className="rsp-versus-icon otherrsp-icon"
          src={otherChoice}
          alt="Other Choice"
        />
      </div>
      <div className="score-batting">
        <p className="batting-word">
          배점
          <input
            type="number"
            min="1"
            max="500"
            placeholder="1 ~ 500"
            value={battingPoint}
            onChange={(e) => setBattingPoint(Number(e.target.value))}
          />
          점
        </p>
      </div>
      <button className="rsp-btn" onClick={() => handleChoice(myChoice)}>
        승부기록!
      </button>
      <div className="rsp-icons">
        <img
          className="rsp-icon"
          src={rock}
          alt="Rock"
          onClick={() => handleChoice(rock)}
        />
        <img
          className="rsp-icon"
          src={scissor}
          alt="Scissor"
          onClick={() => handleChoice(scissor)}
        />
        <img
          className="rsp-icon"
          src={paper}
          alt="Paper"
          onClick={() => handleChoice(paper)}
        />
      </div>

      <button className="reset-btn" onClick={resetGame}>
        리셋
      </button>
    </div>
  );
}

export default App;
