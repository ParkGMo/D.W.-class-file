import React from "react";
import "./DiaryItem.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function DiaryItem({ diaryList }) {
  const { content, date, emotion, id } = diaryList;
  const newDate = new Date(date).toLocaleDateString("ko-KR");
  const Navigate = useNavigate();
  const goDetail = () => {
    Navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    Navigate(`/edit/${id}`);
  };
  return (
    <div className="diaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
        onClick={goDetail}
      >
        <img src={`assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{newDate}</div>
        <div className="diary_content_preview">
          {`${content.slice(0, 25)}...`}
        </div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
}
export default DiaryItem;
