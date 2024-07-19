import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseItem from "../contexts/CourseItem";
import closeButtonImg from "../assets/closeButton.svg";
import styles from "./WishListPage.module.css";
import { css } from "styled-components";
import { getData, getDatas, updateDatas } from "../api/firebase";
import Warn from "../components/Warn";

function WishListPage(props) {
  // courseList state 가 필요함
  const [courseList, setCourseList] = useState([]);
  const member = JSON.parse(localStorage.getItem("member"));
  const { email } = member;

  // handleLoad 함수에서 로그인 사용자의 email로 member 문서 가져오고
  // 문서안에 있는 courseList를 state에 set 해준다.
  const handleLoad = async () => {
    // 로그인 사용자 email
    const resultData = await getData("member", {
      field: "email",
      condition: "==",
      value: email,
    });

    setCourseList(resultData.courselist);
  };

  const handleDelete = async (course) => {
    const result = await updateDatas("member", member.docId, course, {
      type: "DELETE",
      fieldName: "courselist",
    });
    //   화면 다시 랜더링
    handleLoad();
  };
  console.log(courseList);

  // useEffect 안에서 handleLoad 함수 실행
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {courseList.length === 0 ? (
        <Warn
          className={styles.emptyList}
          title="담아 놓은 코스가 없어요."
          description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
        />
      ) : (
        ""
      )}

      <ul className={styles.items}>
        {courseList.map((course) => {
          return (
            <li className={styles.item}>
              <CourseItem course={course} key={course.slug} />
              <img
                className={styles.delete}
                src={closeButtonImg}
                onClick={() => handleDelete(course)}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default WishListPage;
