import React from "react";
import Card from "./../components/Card";
import CourseIcon from "../components/CourseIcon";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.css";

function CourseItem(props) {
  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb}>
        <CourseIcon />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>프로그래밍 기초 in Python</Link>
        </h2>
        <p className={styles.description}>
          웹/앱 개발, 데이터분석, 인공지능/머신러닝, 업무 자동화 등으로 나아가기
          위한 첫 걸음!
        </p>
        <div>
          <ul className={styles.tags}>
            <li>PYTHON</li>
            <li>초급</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
