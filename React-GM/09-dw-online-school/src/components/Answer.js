import React from "react";
import Card from "./Card";
import Writer from "./Writer";

function Answer({ answer }) {
  return (
    <Card>
      <p>답변내용</p>
      <div>
        <div>날짜</div>
        <Writer writer={answer.writer} />
      </div>
    </Card>
  );
}

export default Answer;
