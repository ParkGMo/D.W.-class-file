import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import { css } from "styled-components";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation } from "react-router-dom";
import DateText from "../components/DateText";
import Lined from "../components/Lined";
import Warn from "../components/Warn";
import DOMPurify from "dompurify";

function QuestionPage(props) {
  const question = useLocation().state;
  const { title, createdAt, answers, writer, content } = question;

  const sanitizedData = (data) => {
    return { __html: DOMPurify.sanitize(data) };
  };
  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>
                  <DateText value={createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            {/* dangerouslySetInnerHTML={} : 태그를 내용(문자열)에 넣었을때 
            -> 태그가 없어지고  innerHTML만 뜬다(이벤트는 실행).*/}
            <p
              className={styles.content}
              //   dangerouslySetInnerHTML={{ __html: content }}
              //   <span onClick="alert(`메롱`)">test</span>가 있다면  test만 나오고 이벤트가 실행된다.
              dangerouslySetInnerHTML={sanitizedData(content)}
              //   <span onClick="alert(`메롱`)">test</span>가 있다면  test만 나오고 이벤트가 실행되지 않는다.
            />
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>
          <Lined>{answers.length}개 답변</Lined>
        </h2>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <Answer
              key={answer.id}
              answer={answer}
              className={styles.answerItem}
            />
          ))
        ) : (
          <Warn
            title="답변을 기다리고 있어요"
            description="이 질문의 첫 번째 답변을 달아주시겠어요?"
          />
        )}
      </Container>
    </>
  );
}

export default QuestionPage;
