import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import communityImg from "../assets/community.svg";
import searchImg from "../assets/search.svg";
import styles from "./QuestionListPage.module.css";
import { getDatas } from "../api/firebase";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import personImg from "../assets/person.png";
import UserMenu from "../components/UserMenu";
import QuestionItem from "../components/QuestionItem";

let listItems;
function QuestionListPage(props) {
  const [items, setItems] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(listItems.filter(({ title }) => title.includes(keyWord)));
  };
  const handleKeywordChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleLoad = async () => {
    setIsLoading(true);
    const resultData = await getDatas("questions");
    listItems = resultData;
    setItems(resultData);
    setIsLoading(false);
  };
  console.log(items);
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <ListPage variant={"community"} img={communityImg}>
      <form className={styles.form} /*onSubmit={handleSubmit}*/>
        <input
          placeholder="검색으로 질문 찾기"
          onChange={handleKeywordChange}
          value={keyWord}
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      <div className={styles.questionList}>
        {items.map((question) => (
          <QuestionItem question={question} key={question.docId} />
        ))}
        {/* {items.map((item) => {
          console.log(item);
          const { answers, content, createdAt, title, updatedAt, writer } =
            item;
          const photo = writer.profile.photo;
          return (
            <div className={styles.questionItem}>
              <Card className={styles.info}>
                <p className={styles.title}>
                  <Link>{title}</Link>
                  <span className={styles.questionCount}>
                    {answers.length == 0 ? "" : `[${answers.length}]`}
                  </span>
                </p>
                <p className={styles.date}>
                  {createdAt.split("T")[0].replaceAll("-", ". ")}
                </p>
              </Card>
              <div className={styles.writer}>
                {photo == "/imgs/person.png" ? (
                  <img src={personImg} />
                ) : (
                  <img src={photo} />
                )}
              </div>
            </div>
          );
        })} */}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
