import React, { useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";

function ReviewForm({ addData }) {
  // 초기값이 변화되면 랜더링 되지만 이후에는 초기값이 아니라 바뀐값으로 적용되어 있다.
  const [values, setValues] = useState({});
  const handleChange = (name, value) => {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addData("movie", values);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName="imgUrl"
          onChange={handleChange}
          value={values.imgUrl}
        />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요!"
          onChange={handleInputChange}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder="내용을 입력해주요."
          onChange={handleInputChange}
        />
        <button type="submit">확인</button>
      </div>
    </form>
  );
}
// HTML --> id == React --> name
export default ReviewForm;
