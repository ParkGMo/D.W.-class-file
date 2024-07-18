import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLocation, useParams } from 'react-router-dom';
import getCourseColor from '../utils/getCourseColor';
import { getData } from '../api/firebase';
import styles from './CoursePage.module.css';

function CoursePage() {
  const props = useLocation();
  const { courseSlug } = useParams();

  const [course, setCourse] = useState();

  // undefined.code
  // undefined 여기서 그냥 끝
  //   if(course) {
  //     getCourseColor(course.code)
  //   }
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {
    borderColor: courseColor,
  };

  const handleLoad = async () => {
    const resultData = await getData('courses', {
      field: 'slug',
      condition: '==',
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
          <h1 className={styles.title}>{course?.title}</h1>
          <Button>+ 코스 담기</Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
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
