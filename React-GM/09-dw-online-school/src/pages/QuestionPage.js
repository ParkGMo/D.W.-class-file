import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import { css } from "styled-components";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation } from "react-router-dom";
import DateText from "../components/DateText";

function QuestionPage(props) {
  const question = useLocation().state;
  const { title, createAt, answers, writer, content } = question;
  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>
                  <DateText value={createAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            <p className={styles.content}>{content}</p>
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>0개 답변</h2>
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </Container>
    </>
  );
}

export default QuestionPage;
