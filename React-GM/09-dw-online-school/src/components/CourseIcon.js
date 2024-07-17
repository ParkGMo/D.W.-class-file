import React from "react";
import styles from "./CourseIcon.module.css";
import cn from "classnames";
import python from "../assets/icon--python.svg";

function CourseIcon({ className, photoUrl }) {
  return <img className={cn(styles.courseIcon, className)} src={python} />;
}

export default CourseIcon;
