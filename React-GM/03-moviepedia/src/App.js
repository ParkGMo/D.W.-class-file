import { useEffect, useState } from "react";
import "./firebaseGM.js";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
} from "./firebaseGM";

const LIMIT = 5;

function AppSortButton({ children, onClick, selected }) {
  // chidren 은 텍스트나 태그등 모두를 가져올 수 있다.
  // if (selected == true) {
  //   return (
  //     <button className="AppSortButton selected" onClick={onClick}>
  //       {children}
  //     </button>
  //   );
  // }
  // if (selected == false) {
  //   return (
  //     <button className="AppSortButton" onClick={onClick}>
  //       {children}
  //     </button>
  //   );
  // }
  let isSelected = "";
  if (selected) {
    isSelected = "selected";
  }
  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "Movie",
      options
    );
    // console.log(resultData);
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  const handleAddSucess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
  };

  const handleDelete = async (docId, imgUrl) => {
    // 1.파이어베이스에 접근해서 imgUrl을 사용해 스토리지에 있는 사진파일 삭제

    // 2.docId를 사용해 문서 삭제
    const result = await deleteDatas("Movie", docId, imgUrl);
    // db에서 삭제를 성공했을 때만 그 결과를 화면에 반영한다.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요!");
      return false;
    }

    // 3. items에서 docId 가 같은 요소(객체)를 찾아서 제거
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    // setItems((prevItems) => {
    //   const fiteredArr = prevItems.filter((item) => {
    //     return item.docId !== docId;
    //   });
    //   return fiteredArr;
    // });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);
  // 비동기로 실행 (함수  , [] ) 함수실행 --> [] 변경확인 --> 다시 함수 실행
  // []-> 빈배열이 변경되었을 때만 랜더링한다.
  // [a, b, c] -> a,b,c 중 하나만 변경되어도 랜더링된다.

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm addDatas={addDatas} handleAddSucess={handleAddSucess} />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            베스트순
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} handleDelete={handleDelete} />
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기
          </button>

          {/* {hasNext && (
            <button
              className="App-load-more-button"
              onClick={handleMoreClick}
            >
              더보기
            </button>
          )} */}
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
