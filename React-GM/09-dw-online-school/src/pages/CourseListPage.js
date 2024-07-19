import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import catalogImg from "../assets/catalog.svg";
import searchImg from "../assets/search.svg";
import styles from "./CourseListPage.module.css";
import CourseItem from "../contexts/CourseItem";
import { getDatas } from "../api/firebase";
import Warn from "../components/Warn";

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleKeywordChange = (e) => {
    // 사용자가 입력한키워드를 state에 저장한다.
    setKeyWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 전체 데이터를 가지고 있는 listItems를 활용해.
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // 만든 배열을 items state에 set해준다.
    setItems(listItems.filter(({ title }) => title.includes(keyWord)));
  };

  const handleLoad = async () => {
    setIsLoading(true);
    // firebase의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas("courses");
    // 전체데이터 변수에 저장
    listItems = resultData;
    // 가져온 데이터 콘솔로 확인
    // console.log(resultData);
    // items state에 set 해준다.
    setItems(resultData);
    setIsLoading(false);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant={"catalog"} img={catalogImg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="검색으로 코스 찾기"
          onChange={handleKeywordChange}
          value={keyWord}
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      {items.length === 0 && !isLoading ? (
        <Warn
          className={styles.emptyLIst}
          title="조건에 맞는 코스가 없어요."
          description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
        />
      ) : (
        <div className={styles.courseList}>
          {items.map((course) => {
            return <CourseItem course={course} key={course.docId} />;
          })}
        </div>
      )}
    </ListPage>
  );
}

export default CourseListPage;
