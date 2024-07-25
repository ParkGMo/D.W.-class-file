import React, { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import img1 from "./assets/cat wallpaper1.jpg";
import ReviewForm from "./ReviewForm";
import { updateDatas } from "./firebaseGM";
import useTranslate from "./Hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}.${date.getDate()}`;
}

function ReviewListItem({ item, handleDelete, handleEdit }) {
  const t = useTranslate();
  const handleDeleteClick = () => {
    handleDelete(item.docId, item.imgUrl);
  };
  const handleEditClick = () => {
    handleEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">{item.title}</h1>
        <Rating className="ReviewListItem-rating" hoverRating={item.rating} />
        <p className="ReviewListItem-date">{formatDate(item.createdAt)}</p>
        <p className="ReviewListItem-content">{item.content}</p>
        <div className="ReviewListItem-buttons">
          <button
            className="ReviewListItem-edit-button"
            // onClick={handleEdit}
            onClick={handleEditClick}
          >
            {/* 수정 */}
            {t("edit button")}
          </button>
          <button
            className="ReviewListItem-delete-button"
            onClick={handleDeleteClick}
          >
            {/* 삭제 */}
            {t("delete button")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items, handleDelete, onUpdate, onUpdatedSuccess }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="ReviewList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, rating, content, imgUrl, docId } = item;
          const initialValues = { title, rating, content, imgUrl: null, docId };
          const handleSubmit = (collectionName, dataObj) => {
            const result = onUpdate(collectionName, dataObj, docId);
            return result;
          };
          const handleSubmitSuccess = (result) => {
            onUpdatedSuccess(result);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initalPreview={imgUrl}
                handleCancel={setEditingId}
                onSubmits={handleSubmit}
                handleSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              handleDelete={handleDelete}
              handleEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
