import React from "react";
import { getDatas } from "../api/firebase";
import "./FoodList.css";

function FoodListItem({ item, handleDelete }) {
  const { title, imgUrl, content, createdAt, calorie } = item;
  const date = new Date(createdAt).toLocaleDateString("ko-KR");
  const handleDeleteClick = () => {};
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">{date}</p>
          <div className="FoodListItem-buttons">
            <button className="FoodListItem-edit-button">수정</button>
            <button
              className="FoodListItem-delete-button"
              onClick={() => handleDelete(item.docId, imgUrl)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, handleDelete }) {
  return (
    <ul className="FoodList">
      {items.map((item) => {
        return (
          <li key={item.docId}>
            <FoodListItem item={item} handleDelete={handleDelete} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
