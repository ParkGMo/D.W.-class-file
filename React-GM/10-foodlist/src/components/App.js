import React, { useEffect, useState } from "react";
import "./App.css";
// import styles from "./App.module.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasOrderByLimit,
  updateDatas,
} from "../api/firebase";

const LIMIT = 5;

const INITIAL_VALUES = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: null,
};

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
    setItemCount(5);
  };
  const handleCalorieClick = () => {
    handleLoad();
    setOrder("calorie");
    setItemCount(5);
  };

  const [dataLength, setDataLength] = useState(0);
  const listData = async () => {
    const listDataLength = (await getDatas("food")).length;
    setDataLength(listDataLength);
  };

  const handleLoad = async (options) => {
    const resultData = await getDatasOrderByLimit("food", {
      fieldName: order,
      limits: itemCount,
    });
    setItems(resultData);
  };

  const handleDelete = async (docId, imgUrl) => {
    // items 에서 docId 를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas("food", docId, imgUrl);

    // 삭제 성공시 화면에 그 결과를 반영한다.
    if (!result) {
      alert(message);
      return false;
    }
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };
  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => {
        return item.docId === result.docId;
      });
      const beforeArr = prevItems.slice(0, splitIdx);
      const afterArr = prevItems.slice(splitIdx + 1);
      return [...beforeArr, result, ...afterArr];
    });
  };

  const countOnClick = () => {
    setItemCount((prevCount) => prevCount + LIMIT);
    // handleLoad();
  };
  useEffect(() => {
    handleLoad({ fieldName: order, limits: itemCount });
    listData();
  }, [order, itemCount]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm
            onSubmit={addDatas}
            onSubmitSuccess={handleAddSuccess}
            // item={INITIAL_VALUES}
          />
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
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {itemCount >= dataLength ? (
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
