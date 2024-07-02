import React from "react";
import "./MbtiSelect.css";
import repeat from "./assets/repeat.svg";
import xicon from "./assets/x.svg";

function MbtiSelect(props) {
  return (
    <div className="container">
      <div className="header">
        <h1 className="header-heading">새 컬러 등록하기</h1>
        <a href="javascript:history.go(-1)" className="cancel">
          <img src={xicon} className="cancel-icon" />
        </a>
      </div>
      <div className="section">
        <h2 className="section-heading">이름</h2>
        <input type="text" className="userName" />
      </div>
      <div className="section">
        <h2 className="section-heading">MBTI</h2>
        <div className="mbti-options"></div>
      </div>
      <div className="section">
        <h2 className="section-heading">
          컬러
          <button className="random">
            <img className="repeat-icon" src={repeat} />
          </button>
        </h2>
        <div className="color-input-container">
          <input className="color-input" type="text" value="#9441FF" />
          <span
            className="color-input-chip"
            onClick={() => props.changeColorInput("#9441FF")}
            style="background-color: #9441ff"
          ></span>
        </div>
      </div>
      <button className="submit">컬러 등록</button>
    </div>
  );
}

export default MbtiSelect;
