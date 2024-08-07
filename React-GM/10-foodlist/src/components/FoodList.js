import React, { useState } from "react";
import { getDatas } from "../api/firebase";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import { useTranslate } from "../hooks/useTranslate";

function FoodListItem({ item, onDelete, onEdit }) {
  const { title, imgUrl, content, createdAt, calorie, id } = item;
  const date = new Date(createdAt).toLocaleDateString("ko-KR");
  const t = useTranslate();
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
              {t("edit button")}
            </button>
            <button
              className="FoodListItem-delete-button"
              // onClick={() => handleDelete(item.docId, imgUrl)}
              onClick={handleDeleteClick}
            >
              {t("delete button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess, search }) {
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
          };
          const handleSubmit = (collectionName, updateObj) => {
            const result = onUpdate(collectionName, docId, updateObj, imgUrl);
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
              search={search}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
