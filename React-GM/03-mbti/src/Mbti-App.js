import "./Mbti-App.css";
import "./MbtiSelect.css";
import AddColor from "./AddColor.js";
import repeat from "./assets/repeat.svg";
import xicon from "./assets/x.svg";
import { useState } from "react";

function App() {
  let [pageOn, setPageOn] = useState(0);
  function AddPage(pageOn) {
    if (pageOn == 0) return setPageOn(1);
    if (pageOn == 1) return setPageOn(0);
  }

  if (pageOn == 0) {
    return (
      <div className="App">
        <div className="container">
          <div className="header-container">
            <div className="header">
              <h1>
                MBTI 별<br />
                <span className="accent">좋아하는 컬러</span>
              </h1>
              <div>
                <span className="filter">
                  <span>ESTP</span>
                  <img src={xicon} className="remove-icon" />
                </span>
              </div>
            </div>
          </div>
          <div className="content">
            <a className="add-item" onClick={AddPage}>
              + 새컬러 등록하기
            </a>
            <ul className="items">{/* <AddColor /> */}</ul>
          </div>
        </div>
      </div>
    );
  } else if (pageOn == 1) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="header-heading">새 컬러 등록하기</h1>
          <a className="cancel" onClick={AddPage}>
            <img src={xicon} className="cancel-icon" />
          </a>
        </div>
        <div className="section">
          <h2 className="section-heading">이름</h2>
          <input type="text" className="userName" />
        </div>
        <div className="section">
          <h2 className="section-heading">MBTI</h2>
          <div className="mbti-options">
            <div className="mbti-option">
              <span className="mbti-char">E</span>
              외향형
            </div>
            <div className="mbti-option selected">
              <span className="mbti-char">I</span>
              내향형
            </div>
            <div className="mbti-option">
              <span className="mbti-char">S</span>
              감각형
            </div>
            <div className="mbti-option selected">
              <span className="mbti-char">N</span>
              직관형
            </div>
            <div className="mbti-option">
              <span className="mbti-char">T</span>
              사고형
            </div>
            <div className="mbti-option selected">
              <span className="mbti-char">F</span>
              감정형
            </div>
            <div className="mbti-option">
              <span className="mbti-char">P</span>
              인식형
            </div>
            <div className="mbti-option selected">
              <span className="mbti-char">J</span>
              판단형
            </div>
          </div>
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
              // onClick={() => props.changeColorInput("#9441FF")}
              // style="background-color: #9441ff"
            ></span>
          </div>
        </div>
        <button className="submit">컬러 등록</button>
      </div>
    );
  }
}

export default App;
