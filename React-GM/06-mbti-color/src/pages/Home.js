import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "../components/ColorSurvey";
import mockItems from "../lib/mock.json";
import { getAllDatas, getDatas } from "../lib/firebase";

// css가 겹칠 수 있기 때문에 module css 파일을 만든다. ex)파일명.module.css

function Home(props) {
  const [items, setItems] = useState([]);
  const nextPageRef = useRef(null); // 새로 랜더링 되더라도 useRef는 유지가 된다.
  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const { resultData, lastQuery } = await getAllDatas("MBTI-Colour", "id");

    // items state에 셋팅
    setItems(resultData);
    nextPageRef.current = lastQuery;
    console.log(resultData, lastQuery);
  };
  const handleLoadNext = async () => {
    const { resultData, lastQuery } = await getAllDatas(
      "MBTI-Colour",
      "id",
      nextPageRef.current
    );
    if (resultData.length != 0) {
      setItems((prevItems) => [...prevItems, ...resultData]);
      nextPageRef.current = lastQuery;
    } else {
      nextPageRef.current = null;
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!nextPageRef.current) {
        return false;
      }
      // scrollHeight : html 문서 전체 높이, (scrollTop + clientHeight)
      // scrollTop : 처음 화면의 윗부분에서 스크롤로 내린 윗부분 까지
      // clientHeight : 보이는 화면 높이
      // 바닥에 닿았다 -> scrollHeight = (scrollTop + clientHeight)
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        handleLoadNext();
      }
    }
    window.addEventListener("scroll", handleScroll);
    // 리액트 컴포넌트 라이프 사이클
    // render() => constructor() => componentDidMount() => componentDidUpdate()
    //  => componentWillUnmount()   -----> 낮은 버전에서 직접활용 ( < 15)
    // rander(): 컴포넌트의 기능과 모양을 정의하는 함수로 리액트 요소를 반환한다.
    // constructor(): 컴포넌트를 만들 때 처음으로 호출되는 함수이다. 여기에서 state 의 초기값이 설정된다.
    // componentDidMount(): 컴포넌트를 생성하고 첫 랜더링이 끝났을 때 호출되는 함수이다.
    //  업데이트 되는 경우 : props 값 변경, state 값 변경, 부모 컴포넌트가 리렌더링 될 때
    // componentDidUpdate(): 컴포넌트 업데이트 작업이 끝난 후 호출되는 함수

    // 언마운트시
    // 컴포넌트가 DOM에서 제거되는 것
    // componentWillUnmount(): 해당 컴포넌트가 제거되기 직전에 호출된다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src="/images/x.svg" />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {items?.map((item, idx) => {
            return <ColorSurvey key={idx} mbtiData={item} />;
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
