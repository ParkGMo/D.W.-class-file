import React from "react";
import styles from "./ColorSurvey.module.css";
import colorList from "../lib/mock.json";

function ColorSurvey(props) {
  return (
    <>
      {colorList.map((m) => {
        const { colorCode, createdAt, updatedAt, id, mbti } = m;
        return (
          <div className={styles.colorSurvey}>
            <div className={styles.id}>{id}</div>
            <div className={styles.mbti}>{mbti}</div>
            <div className={styles.arrow}>
              <img className={styles.arrowIcon} src="/images/arrow.svg" />
            </div>
            <div
              className={styles.colorChip}
              style={{ backgroundColor: `${colorCode}` }}
            ></div>
            <div className={styles.colorCode}>{colorCode}</div>
          </div>
        );
      })}

      {/* {colorList.map((m) => {
        const { colorCode, createdAt, updatedAt, id, mbti } = m;
        console.log(id);
  
      })}
      <div className={styles.id}>1</div>
      <div className={styles.mbti}>INTJ</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: "#d9d9d9" }}
      ></div>
      <div className={styles.colorCode}>#D9D9D9</div> */}
    </>
  );
}

export default ColorSurvey;
