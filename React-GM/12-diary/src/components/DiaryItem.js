import React from "react";
import "./DiaryItem.css";
import Button from "./Button";

function DiaryItem({ diaryList }) {
  const { content, date, emotion } = diaryList;
  const newDate = new Date(date).toLocaleDateString("ko-KR");
  return (
    <div className="diaryItem">
      <div className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}>
        <img src={`assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{newDate}</div>
        <div className="diary_content_preview">
          {`${content.slice(0, 25)}...`}
        </div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
}
export default DiaryItem;
