import React, { useContext, useState } from "react";
import FileInput from "./FileInput.js";
import RatingInput from "./RatingInput.js";
import "./ReviewForm.css";
import { LocaleContext, useLocale } from "./contexts/LocaleContext.js";
import useTranslate from "./Hooks/useTranslate.js";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  onSubmits,
  handleSubmitSuccess,
  initialValues = INITIAL_VALUE,
  initalPreview,
  handleCancel,
}) {
  // 초기값이 변화되면 랜더링 되지만 이후에는 초기값이 아니라 바뀐값으로 적용되어 있다.
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const locale = useLocale();
  const t = useTranslate();
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
    const result = await onSubmits("Movie", values);
    handleSubmitSuccess(result);
    setValues(INITIAL_VALUE);

    // 버튼활성화
    setIsSubmitting(false);
  };
  const handleUpdatdSuccess = (result) => {
    handleUpdatdSuccess(result);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName="imgUrl"
          onChange={handleChange}
          value={values.imgUrl}
          initalPreview={initalPreview}
        />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder={t("title placeholer")}
          onChange={handleInputChange}
          value={values.title}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          value={values.content}
        />
        {handleCancel && (
          <button onClick={() => handleCancel(null)}>
            {/* 취소 */}
            {t("cancel button")}
          </button>
        )}
        <button type="submit" disabled={isSubmitting}>
          {/* 확인 */}
          {t("confirm button")}
        </button>
      </div>
    </form>
  );
}
// HTML --> id == React --> name
export default ReviewForm;
