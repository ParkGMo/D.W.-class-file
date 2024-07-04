import { useEffect, useState } from "react";
import "./firebaseGM.js";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import { getDatas, getDatasByOrder, getDatasByOrderLimit } from "./firebaseGM";

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
          <ReviewForm />
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
          <ReviewList items={items} />
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
