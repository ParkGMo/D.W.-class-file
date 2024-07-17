import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import catalogImg from "../assets/catalog.svg";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../contexts/CourseItem";
import { getDatas } from "../api/firebase";

function CourseListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    // firebase의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas("courses");
    // 가져온 데이터 콘솔로 확인
    console.log(resultData);

    // items state에 set 해준다.
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant={"catalog"} img={catalogImg}>
      <form className={styles.form}>
        <input placeholder="검색으로 코스 찾기" />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem course={course} key={course.docId} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
