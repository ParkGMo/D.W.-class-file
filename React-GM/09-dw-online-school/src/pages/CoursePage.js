import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Card from "../components/Card";
import { useLocation, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData, getDatas } from "../api/firebase";
import styles from "./CoursePage.module.css";
import Button from "../components/Button";

function CoursePage() {
  const props = useLocation();
  const { courseSlug } = useParams();
  const [course, setCourse] = useState();

  // course?.code : "?" -> undefined나 null이면 평가를 멈춘다. --> undefined로 반환// 값이 있으면 실행
  //  == if(course) {getCourseColor(course.code);}
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {
    borderColor: courseColor,
  };
  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}전</h1>
          <Button variant="round">+ 코스 담기</Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      {course?.topics.map(({ topic }) => {
        // const topic = items.topic;
        // const { slug, summary, title } = topic;
        return (
          <Container className={styles.topics}>
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          </Container>
        );
      })}
    </>
  );
}

export default CoursePage;
