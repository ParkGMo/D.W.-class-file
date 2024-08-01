import React, { useContext, useRef, useState } from "react";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion.js";
import "./DiaryEditor.css";
import { DiaryDispatchContext } from "../App.js";
import { ref } from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";

const INITIAL_VALUES = {
  date: "",
  content: "",
  emotion: 3,
};

function DiaryEditor(props) {
  const { onCreate } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const Navigate = useNavigate();

  // 1. 날짜, 감정, 텍스트 관리할 상태를 만들어야한다.
  const [values, setValues] = useState(INITIAL_VALUES);
  // 2. 각각의 emotionItem을 클릭했을 때 콘솔창에 emotion_id 를 출력해본다.
  // 3. 1번에서 만든 state의 값이 변경되도록 만든 후 개발자도구의 components 탭에서 확인
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
    // 4. 상태 변경 함수를 emotionItem의 onClick에 전달
    // 5. emotionItem_on_${id} 클래스가 적용될 수 있도록 만든다.
  };
  const handleSubmit = (e) => {
    if (values.content.trim().length < 1) {
      alert("내용을 입력하세요!");
      handleChange("content", "");
      contentRef.current.focus();
      return;
    }
    // react는 그냥 confirm을 한다면 가상DOM에서 실행됨으로  앞에 window.을 붙여준다.
    if (window.confirm("새로운 일기를 저장하시겠습니까?")) {
      onCreate(values);
    }
    Navigate("/", { replace: true });
  };

  return (
    <div className="diaryEditor">
      <Header
        headText={"새 일기 작성하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => Navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              name="date"
              onChange={handleInputChange}
              value={values.date}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotion) => {
              return (
                <EmotionItem
                  key={emotion.emotion_id}
                  {...emotion}
                  name="emotion"
                  onChange={handleChange}
                  isSelected={emotion.emotion_id === values.emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              name="content"
              onChange={handleInputChange}
              value={values.content}
              ref={contentRef}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} />
            <Button
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;