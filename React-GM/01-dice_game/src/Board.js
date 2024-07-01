import React from "react";
import diceBlue from "./assets/dice-blue-3.svg";
import diceRed from "./assets/dice-red-4.svg";

function Board(props) {
  return (
    <div className="App-board">
      <h2>나</h2>
      <img src={diceBlue} />
      <h2>총점</h2>
      <p>4</p>
      <h2>기록</h2>
      <p>1, 3</p>
    </div>
  );
}

export default Board;
