import React from "react";
import { useState, useEffect } from "react";
// import "./firebaseGM.js";
import arrow from "./assets/arrow.svg";
import { getDatas } from "./firebaseGM.js";

async function AddColor(props) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const data = await getDatas("MBTI-Colour");
        setDatas(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDatas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  datas = await getDatas("MBTI-Colour");
  return (
    <ul className="items">
      {datas.map((doc, idx) => {
        const info = doc.data();
        const infoMbti = info.mbti;
        const colorMbti = info.code.toUpperCase();
        <li className="item" key={idx}>
          <div className="item-id">{idx + 1}</div>
          <div className="item-mbti">{infoMbti}</div>
          <div className="item-arrow">
            <img src={arrow} className="item-arrow-icon" />
          </div>
          <div className="item-color-chip"></div>
          <div className="item-color-code">{colorMbti}</div>
        </li>;
      })}
    </ul>
  );
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
