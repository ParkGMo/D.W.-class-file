import React, { useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({ addDatas, handleAddSucess }) {
  // 초기값이 변화되면 랜더링 되지만 이후에는 초기값이 아니라 바뀐값으로 적용되어 있다.
  const [values, setValues] = useState({ INITIAL_VALUE });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (name, value) => {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 버튼 비활성화
    setIsSubmitting(true);
    e.target.reset();
    const result = await addDatas("Movie", values);
    handleAddSucess(result);
    setValues(INITIAL_VALUE);

    // 버튼활성화
    setIsSubmitting(false);
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
        <button type="submit" disabled={isSubmitting}>
          확인
        </button>
      </div>
    </form>
  );
}
// HTML --> id == React --> name
export default ReviewForm;
