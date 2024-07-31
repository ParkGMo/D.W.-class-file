import React, { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion.js";
import "./DiaryEditor.css";

const INITIAL_VALUE = {
  date: new Date(),
  emotion: emotionList[0],
  text: "",
};

function DiaryEditor(props) {
  //  날짜, 감정, 텍스트, 관리할 상태를 만들어야한다.
  // emotion을 클릭했을 때 감정을 관리하는 상태의 값을 변경
  // 변경된 상태의 값과 emotion의 id가 같으면 isSelected라는 props을 전달해서
  // emotionItem_on_${id} 클래스가 적용될 수 있도록 만든다.
  const [diary, setDiary] = useState(INITIAL_VALUE);
  const [isSelected, setIsSelected] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
  };
  return (
    <div className="diaryEditor">
      <Header
        headText={"새 일기 작성하기"}
        leftChild={<Button text={"<뒤로가기"} />}
      />
      <div onChange={handleChange}>
        <section>
          <h4> 오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              // onChange={handDateChange}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotion, idx) => {
              return (
                <EmotionItem
                  key={idx}
                  {...emotion}
                  select={setIsSelected}
                  isSelect={isSelected}
                  idx={idx}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea placeholder="오늘은 어땠나요?" />
          </div>
        </section>
        <section>
          <div className="controlBox">
            <Button text={"취소하기"} />
            <Button text={"작성완료"} type={"positive"} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
