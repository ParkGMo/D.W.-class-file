import React from "react";
import Card from "./../components/Card";
import CourseIcon from "../components/CourseIcon";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.css";
import getCourseColor from "../utils/getCourseColor";

const DIFFICULTY = {
  0: "입문",
  1: "초급",
  2: "중급",
  3: "고급",
};

const colorDict = {
  1: "pink",
  2: "pink",
  3: "mint",
  4: "yellow",
  5: "yellow",
  6: "yellow",
  7: "pink",
  8: "pink",
  9: "mint",
};
function CourseItem({ course }) {
  const { title, summary, difficulty, code, language, photoUrl, slug } = course;
  const coursColor = getCourseColor(code);
  const thumbStyle = {
    borderColor: coursColor,
  };
  return (
    <Card className={styles.courseItem}>
      <div className={styles[colorDict[code.charAt(0)]]}>
        {/* <div className={styles.thumb} style={thumbStyle}> */}
        <CourseIcon photoUrl={photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/courses/${slug}`} state={{ course }}>
            {title}
          </Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{DIFFICULTY[difficulty]}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
