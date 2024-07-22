import React from 'react';
import Container from '../components/Container';
import styles from './QuestionPage.module.css';
import Writer from '../components/Writer';
import Answer from '../components/Answer';
import { useLocation } from 'react-router-dom';
import DateText from './../components/DateText';

function QuestionPage() {
  //   const question = useLocation().state.question;
  const { question } = useLocation().state;
  const { title, createdAt, answers, writer } = question;
  debugger;
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
            <p className={styles.content}>질문내용</p>
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>0개 답변</h2>
        <Answer />
      </Container>
    </>
  );
}

export default QuestionPage;
