import React from "react";
import diceBlue from "./assets/dice-blue-1.svg";
import diceRed from "./assets/dice-red-1.svg";
import Dice from "./Dice";

function Board({ name, color, gameHistory }) {
  // function Board(props) {
  // props로 가져올 수 있다.
  // const name = props.name;
  // const { name } = props; // destructuring assignment로 name을 props로부터 받아올 수 있다.
  const sum = gameHistory.reduce((a, b) => a + b, 0);
  return (
    <div className="App-board">
      <h2>{name}</h2>
      <Dice color={color} num={gameHistory[gameHistory.length - 1]} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{gameHistory.join(", ")}</p>
    </div>
  );
}

export default Board;
