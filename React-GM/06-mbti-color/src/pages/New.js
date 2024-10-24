import React, { useState } from "react";
import styles from "./New.module.css";
import { Link } from "react-router-dom";
import MBTISelect from "../components/MBTISelect";
import ColorInput from "../components/ColorInput";
import generateColorCode from "../lib/generateColor";
import { addDatas } from "../lib/firebase";

const INITAIL_VALUE = {
  mbti: "",
  colorCode: "",
};
function New(props) {
  const [formValue, setFormValue] = useState(INITAIL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setFormValue((prevFormValue) => {
      return { ...prevFormValue, [name]: value };
    });
  };

  const handleRandomClick = () => {
    const nextColorCode = generateColorCode();
    handleChange("colorCode", nextColorCode);
  };
  const handleSave = async () => {
    const { mbti, colorCode } = formValue;
    if (mbti.length < 4) {
      alert("MBTI를 선택해주세요.");
      return false;
    }
    if (colorCode.length == 0) {
      alert("color를 선택해주세요.");
      return false;
    }

    setIsSubmitting(true);
    const result = await addDatas(`MBTI-Colour`, formValue);
    if (result) {
      alert("MBTI 등록 성공!");
      setFormValue(INITAIL_VALUE);
    } else {
      alert("MBTI 등록을 실패하였습니다. \n 관리자에게 문의하세요.");
    }
    setIsSubmitting(false);
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img className={styles.cancelIcon} src="/images/x.svg" />
        </Link>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>이름</h2>
        <input type="text" className={styles.userName} />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>MBTI</h2>
        <MBTISelect
          mbtiValue={formValue.mbti}
          handleChange={(newMbti) => handleChange("mbti", newMbti)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random} onClick={handleRandomClick}>
            <img className={styles.repeatIcon} src="/images/repeat.svg" />
          </button>
        </h2>
        <ColorInput
          colorCodeValue={formValue.colorCode}
          handleChange={(newColorCode) =>
            handleChange("colorCode", newColorCode)
          }
        />
      </section>
      <button
        className={styles.submit}
        onClick={handleSave}
        disabled={isSubmitting}
      >
        컬러 등록
      </button>
    </div>
  );
}

export default New;
