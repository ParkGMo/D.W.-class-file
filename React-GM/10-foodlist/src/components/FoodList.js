import React, { useEffect, useState } from "react";
import { getDatas } from "../api/firebase";
import "./FoodList.css";

function FoodListItem() {
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">수박</h1>
          <span className="FoodListItem-calorie">25kcal</span>
        </div>
        <p className="FoodListItem-content">10kg 수박</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">2024.7.24</p>
          <div className="FoodListItem-buttons">
            <button className="FoodListItem-edit-button">수정</button>
            <button className="FoodListItem-delete-button">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList(props) {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    const resultData = await getDatas("food");
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <ul className="FoodList">
      <li>
        <FoodListItem />
      </li>
      {/* {items.map((item) => {
        const { calorie, content, createdAt, imgUrl, title } = item;
        return (
          <li className="FoodListItem">
            <img className="FoodListItem-img" src={imgUrl} />
            <div className="FoodListItem-rows">
              <h1 className="FoodListItem-title">{title}</h1>
              <span className="FoodListItem-calorie">{calorie} Kcal</span>
              <p className="FoodListItem-date">{createdAt}</p>
              <p className="FoodListItem-content">{content}</p>
              <div className="FoodListItem-buttons"></div>
            </div>
          </li>
        );
      })} */}
    </ul>
  );
}

export default FoodList;
