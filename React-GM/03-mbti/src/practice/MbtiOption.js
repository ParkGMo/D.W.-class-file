import React from "react";
import { useEffect, useState } from "react";

let selecta = "selected";
function MbtiOption({ MBTIa, MBTIb, MBTIk, MBTIj, select }) {
  // let selectisa = "";
  const [selectisa, setSelctisa] = useState("selected");
  const [selectisb, setSelctisb] = useState("");
  const MbtiOptionBtn = () => {
    if (!selectisa) {
      setSelctisa("selected");
      setSelctisb("");
    }
    if (!selectisb) {
      setSelctisb("selected");
      setSelctisa("");
    }
  };

  return (
    <div className="mbti-blocks">
      <div className={`mbti-option ${selectisa}`} onClick={MbtiOptionBtn}>
        <span className="mbti-char">{MBTIa}</span>
        {MBTIk}
      </div>
      <div className={`mbti-option ${selectisb}`} onClick={MbtiOptionBtn}>
        <span className="mbti-char">{MBTIb}</span>
        {MBTIj}
      </div>
    </div>
  );
}

export default MbtiOption;
