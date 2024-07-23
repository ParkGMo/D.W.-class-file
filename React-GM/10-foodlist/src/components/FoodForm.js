import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";

function FoodForm(props) {
  //   const [calorie, setCalorie] = useState(0);
  const handChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <form className="FoodForm" onChange={handChange}>
      <FileInput className="FoodForm-preview" />
      <div className="FoodForm-rows">
        <div className="FoodForm-tilte-calorie">
          <input
            className="FoodForm-title"
            type="text"
            placeholder="이름을 입력해주세요."
            // onChange={handChange}
          />
          <input
            className="FoodForm-calorie"
            type="number"
            // onChange={handChange}
          />
          <button className="FoodForm-submit-button">확인</button>
        </div>
        <textarea
          className="FoodForm-content"
          placeholder="내용을 작성해 주세요."
          //   onChange={handChange}
        />
      </div>
    </form>
  );
}

export default FoodForm;
