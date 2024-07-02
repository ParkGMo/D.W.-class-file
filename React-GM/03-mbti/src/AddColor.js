import React from "react";
import "./firebaseGM.js";
import arrow from "./assets/arrow.svg";
import { getDatas } from "./firebaseGM.js";
async function AddColor(props) {
  const datas = await getDatas("MBTI-Colour");
  let idx = 1;
  datas.forEach((doc) => {
    const info = doc.data();

    const infoMbti = info.mbti;
    const colorMbti = info.code.toUpperCase();
    return (
      <li className="item">
        <div className="item-id">{idx}</div>
        <div className="item-mbti">{infoMbti}</div>
        <div className="item-arrow">
          <img src={arrow} className="item-arrow-icon" />
        </div>
        <div className="item-color-chip"></div>
        <div className="item-color-code">{colorMbti}</div>
      </li>
    );
    idx++;
  });
}
// return (
//   <li className="item">
//     <div className="item-id">{idx}</div>
//     <div className="item-mbti">{infoMbtiArr}</div>
//     <div className="item-arrow">
//       <img src={arrow} className="item-arrow-icon" />
//     </div>
//     <div
//       className="item-color-chip"
//       // style="background-color: {`${info.code}`}"
//     ></div>
//     <div className="item-color-code">{colorMbtiArr}</div>
//   </li>
// );

export default AddColor;
