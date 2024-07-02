import React from "react";
import Handicon from "./Handicon";
import "./HandButton.css";

function HandButton({ value, onClick }) {
  // onClick에서 value를 가져오는 방법
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button className="HandButton" onClick={handleClick}>
      {/* <button className="HandButton" onClick={() => onClick(value)}> */}
      <Handicon value={value} className="HandButton-icon" />
    </button>
  );
}

export default HandButton;
