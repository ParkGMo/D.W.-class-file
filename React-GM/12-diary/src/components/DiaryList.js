import React, { useEffect, useState } from "react";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

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
      return true;
    };

    // 정렬 함수
    const getOrderedList = (a, b) => {
      // order state 가  latest이면 b-a
      if (order === "latest") {
        return b - a;
        // order state 가  oldest이면 a-b
      } else if (order === "oldest") {
        return a - b;
      }
      return 0;
      const filteredList = diaryList.filter(getFilteredList);
      const sortedList = filteredList.sort((a, b) => getOrderedList(a, b));
      return sortedList;
    };
  };
  useEffect(() => {
    getSortedDiaryList();
  }, [order, filter]);

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
          <Button
            text={"새 일기쓰기"}
            type="positive"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {diaryList.map((diary) => {
        return <DiaryItem diaryList={diary} key={diary.id} {...diary} />;
      })}
    </div>
  );
}

export default DiaryList;
