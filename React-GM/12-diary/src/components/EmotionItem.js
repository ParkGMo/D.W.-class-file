import React, { useState } from "react";
import "./EmotionItem.css";

function EmotionItem({
  emotion_id,
  emotion_img,
  emotion_description,
  select,
  isSelect,
  idx,
}) {
  const changeEmotion =
    idx + 1 === isSelect ? `emotionItem_on_${emotion_id}` : "emotionItem_off";
  return (
    <div
      className={`emotionItem ${changeEmotion}`}
      // className="emotionItem emotionItem_off"
      onClick={() => select(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
}

export default EmotionItem;
