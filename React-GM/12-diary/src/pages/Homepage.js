import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

function Homepage(props) {
  const { diaryList, auth } = useContext(DiaryStateContext);
  const [curDate, setCurDate] = useState(new Date());
  const [sortedItem, setSortedItem] = useState([]);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  const sortDiaries = (order) => {};
  // console.log(new Date(curDate.getTime()));
  const dateArr = [];
  useEffect(() => {
    // 1. curDate를 활용하여 firstDay와 lastDay를 만들어준다.
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      1,
      0,
      0,
      0
    ).getTime();
    // console.log(
    //   `firstDay: ${firstDay.getTime()}, lastDay: ${lastDay.getTime()}`
    // );
    // new Date(2024, 8, 1, h, m, s,)
    // 2. firstDay와 lastDay를 밀리세컨즈 형태로 변환
    // 3. diaryList 에서 date 필드가 firstDay와 lastDay 사이에 있는 원소들만 뽑아서 새로운 배열 생성
    const newItem = diaryList.filter(
      (diary) => diary.date >= firstDay && diary.date <= lastDay
    );
    setSortedItem(newItem);

    // dateItem.map((item) => {
    //   const { date } = item;
    //   if (firstDay <= date && date < lastDay) {
    //     dateArr.push(item);
    //     // 4. setSortedItem함수 사용
    //     setSortedItem(dateArr);
    //      ---> 배열에 2개의 객체는 들어가지 않는다... 이유는??
    //   } else {
    //     setSortedItem([]);
    //   }
    // });
  }, [curDate, diaryList]); // *빈배열에 호출 --> 첫화면 없음 --> diaryList 가 들어오면 랜더링!
  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />

      <DiaryList diaryList={sortedItem} auth={auth} />
    </div>
  );
}

export default Homepage;
