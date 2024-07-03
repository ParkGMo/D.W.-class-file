import { useEffect, useState } from "react";
import "./firebaseGM.js";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import mockItems from "./mock.json";
import { getDatas } from "./firebaseGM";

function AppSortButton({ children }) {
  // chidren 은 텍스트나 태그등 모두를 가져올 수 있다.
  return <button className="AppSortButton selected">{children}</button>;
}

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("Movie");
    // console.log(resultData);
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  // []-> 빈배열이면 변경되었을 때만 랜더링한다.
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
          <AppSortButton>최신순</AppSortButton>
          <AppSortButton>베스트순</AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button className="App-load-more-button">더보기</button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
