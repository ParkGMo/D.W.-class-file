import React, { useEffect, useState } from "react";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuth } from "../api/firebaseGM";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된순", value: "oldest" },
];
const filterOptionList = [
  { name: "전부다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안좋은 감정만", value: "bad" },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const diaryList = useSelector((state) => state.diary.items);
  const auth = getUserAuth();

  const checkLogin = () => {
    if (!isAuthenticated) {
      alert("로그인을 해주세요.");
      navigate("/login");
    } else {
      navigate("/new");
    }
  };

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = (diary) => {
      // filter state -- good (emotion 값이 3보다 작거나 같을 떄)
      if (filter === "good") {
        return diary.emotion <= 3;
        // filter state -- bad (emotion 값이 3보다 클 때)
      } else if (filter === "bad") {
        return diary.emotion > 3;
      }
      return diary;
    };
    // const filteredList =
    //   filter === "all"
    //     ? diaryList
    //     : diaryList.filter(function (diary) {
    //         if (filter === "good") {
    //           return diary.emotion <= 3;
    //         } else if (filter === "bad") {
    //           return diary.emotion > 3;
    //         }
    //       });

    // 정렬 함수
    const getOrderedList = (a, b) => {
      // order state 가  latest이면 b-a
      if (order === "latest") {
        return b.date - a.date;
        // order state 가  oldest이면 a-b
      } else if (order === "oldest") {
        return a.date - b.date;
      }
      return 0;
    };
    // const filteredList = diaryList.filter((diary) => getFilteredList(diary));
    const filteredList =
      filter === "all"
        ? diaryList
        : diaryList.filter((diary) => getFilteredList(diary));
    const sortedList = filteredList.sort(getOrderedList);
    return sortedList;
  };

  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="new_btn">
          <Button text={"새 일기쓰기"} type="positive" onClick={checkLogin} />
        </div>
        {auth.currentUser && (
          <div>
            <Button
              text={"로그아웃"}
              type={"negative"}
              onClick={() => auth.signOut()}
            />
          </div>
        )}
      </div>
      {getSortedDiaryList().map((diary) => {
        return (
          <DiaryItem
            diaryList={diary}
            key={diary.id}
            {...diary}
            isAuthenticated={isAuthenticated}
          />
        );
      })}
    </div>
  );
}

export default DiaryList;
