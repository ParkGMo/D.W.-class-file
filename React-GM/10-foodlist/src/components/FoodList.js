import React, { useState } from "react";
import { getDatas } from "../api/firebase";
import "./FoodList.css";
import FoodForm from "./FoodForm";

function FoodListItem({ item, onDelete, onEdit }) {
  const { title, imgUrl, content, createdAt, calorie, id } = item;
  const date = new Date(createdAt).toLocaleDateString("ko-KR");
  const handleDeleteClick = () => {
    onDelete(item.docId, imgUrl);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
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
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              수정
            </button>
            <button
              className="FoodListItem-delete-button"
              // onClick={() => handleDelete(item.docId, imgUrl)}
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);
  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id == editingId) {
          const { title, calorie, content, imgUrl, docId } = item;
          const initialValues = {
            title,
            calorie,
            content,
            imgUrl: null,
            docId,
          };
          const handleSubmit = (collectionName, dataObj) => {
            const result = onUpdate(collectionName, dataObj, docId);
            return result;
          };
          const handleSubmitSuccess = (result) => {
            onUpdateSuccess(result);
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={setEditingId}
                item={item}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.docId}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
