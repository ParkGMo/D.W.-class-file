import React from "react";
import RatingInput from "./RatingInput.js";
import FileInput from "./FileInput.js";
import "../ReviewForm.css";

function ReviewForm(props) {
  return (
    <form>
      <FileInput />
      <input type="text " />
      <RatingInput />
      <textarea />
      <button>확인</button>
    </form>
  );
}

export default ReviewForm;
