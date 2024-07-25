import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset-white.png";
import "./FileInput.css";

function FileInput({ name, value, onChange, initialPreview }) {
  // value는 문자열로 넘어온다. -> createObjectURL()에는 미디어소스 블록타입 형태로 들어와야한다.
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  return (
    <div className="FileInput">
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button
          className="FileInput-clear-button"
          onClick={handleClearClick}
          type="button"
        >
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
