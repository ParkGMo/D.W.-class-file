import React, { useEffect, useState } from "react";
import Card from "./Card";
import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import styles from "./QuestionItem.module.css";
import { getDatas } from "../api/firebase";
import personImg from "../assets/person.png";
import DateText from "./DateText";

let listItems;

function QuestionItem({ question }) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    listItems = resultData; //검색용으로 사용할 전체 데이터를 가지고 있어야한다.
    setItems(resultData);
  };

  const { answers, content, createdAt, title, updatedAt, writer } = question;
  const photo = writer.profile.photo;

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <Card className={styles.questionItem}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${question.docId}`} state={question}>
            {title}
          </Link>

          <span className={styles.count}>
            {answers.length == 0 ? "" : `[${answers.length}]`}
          </span>
        </p>
        <p className={styles.date}>
          <DateText value={createdAt} />
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar photoUrl={photo} name={writer.name} />
      </div>
    </Card>
    // <Card className={styles.questionItem}>
    //   <div className={styles.info}>
    //     <p className={styles.title}>
    //       <Link>useEffect는 언제 사용하는 건가요?</Link>
    //       <span className={styles.count}>[2]</span>
    //     </p>
    //     <p className={styles.date}>2024.07.22</p>
    //   </div>
    //   <div className={styles.writer}>
    //     <Avatar />
    //   </div>
    // </Card>
  );
}

export default QuestionItem;
