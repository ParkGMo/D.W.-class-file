import React, { useEffect, useState } from "react";
import "./App.css";
// import styles from "./App.module.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import { getDatas, getDatasOrderByLimit } from "../api/firebase";

const LIMIT = 5;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App(props) {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(5);
  const [order, setOrder] = useState("createdAt");
  const handleNewestClick = () => {
    handleLoad();
    setOrder("createdAt");
  };
  const handleCalorieClick = () => {
    handleLoad();
    setOrder("calorie");
  };

  const [dataLength, setDataLength] = useState(0);
  const listData = async () => {
    const listDataLength = (await getDatas("food")).length;
    setDataLength(listDataLength);
  };

  const handleLoad = async (options) => {
    const resultData = await getDatasOrderByLimit("food", options);
    setItems(resultData);
  };

  const countOnClick = () => {
    setItemCount((prevCount) => prevCount + LIMIT);
    // handleLoad();
  };
  useEffect(() => {
    handleLoad({ fieldName: order, limits: itemCount });
    countOnClick();
    listData();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
        </div>
        <div className="App-filter">
          <form className="App-search">
            <input className="App-search-input" />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order == "createdAt" ? true : false}
              onClick={handleNewestClick}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              selected={order == "calorie" ? true : false}
              onClick={handleCalorieClick}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList items={items} />
        {itemCount >= dataLength + 5 ? (
          ""
        ) : (
          <button className="App-load-more-button" onClick={countOnClick}>
            더보기
          </button>
        )}
        {/* <button onClick={countOnClick}>더보기</button> */}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
