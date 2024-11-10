import React from "react";
import styles from "./ColorSurvey.module.css";

function ColorSurvey({ mbtiData, idx }) {
  const { id, mbti, name, code } = mbtiData;

  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>{idx + 1}</div>
      <div className={styles.id}>{name}</div>
      <div className={styles.mbti}>{mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div className={styles.colorChip} style={{ backgroundColor: code }}></div>
      <div className={styles.colorCode}>{code}</div>
    </div>
  );
}

export default ColorSurvey;
