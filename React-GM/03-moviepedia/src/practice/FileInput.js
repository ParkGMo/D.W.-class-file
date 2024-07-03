import React from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "../FileInput.css";

function FileInput(props) {
  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={placeholderImg} />
      <input className="FileInput-hidden-overlat" type="file" />
      <button className="FileInput-clear-button">
        <img src={resetImg} />
      </button>
    </div>
  );
}

export default FileInput;
