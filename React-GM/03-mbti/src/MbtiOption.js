import React from "react";

function MbtiOption({ MBTIa, MBTIk, select }) {
  return (
    <div className={`mbti-option ${select}`}>
      <span className="mbti-char">{MBTIa}</span>
      {MBTIk}
    </div>
  );
}

export default MbtiOption;
