import React, { useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";

function ReviewForm(props) {
  // 초기값이 변화되면 랜더링 되지만 이후에는 초기값이 아니라 바뀐값으로 적용되어 있다.
  const [values, setValues] = useState({});
  const handleChange = (name, value) => {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput name="imgUrl" onChange={handleChange} />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요!"
          onChange={handleInputChange}
        />
        <RatingInput />
        <textarea
          name="content"
          placeholder="내용을 입력해주요."
          onChange={handleInputChange}
        />
        <button>확인</button>
      </div>
    </form>
  );
}
// HTML --> id == React --> name
export default ReviewForm;
