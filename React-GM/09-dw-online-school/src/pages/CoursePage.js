import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData, getDatas, updateDatas } from "../api/firebase";
import styles from "./CoursePage.module.css";
import Button from "../components/Button";

function CoursePage() {
  const props = useLocation();
  const { pathname } = props;
  const { courseSlug } = useParams();
  const [course, setCourse] = useState();
  const navigate = useNavigate();

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

  const handleAddWishlistClick = async () => {
    const member = JSON.parse(localStorage.getItem("member"));
    if (member) {
      const result = await updateDatas("member", member.docId, course, {
        type: "ADD",
        fieldName: "courselist",
      });
      if (result) {
        navigate("/wishlist");
      } else {
        alert("코스 담기를 실패했습니다.\n관리자에게 문의하세요.");
      }
    } else {
      alert("로그인을 해주세요!");
      navigate("/login", { replace: true });
    }
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
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          // const topic = items.topic;
          // const { slug, summary, title } = topic;
          return (
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
