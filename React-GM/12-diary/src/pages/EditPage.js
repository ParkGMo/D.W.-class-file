import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { changeTitle } from "../util/changeTitle";

function EditPage() {
  const { id } = useParams();
  const [selectData, setSelectData] = useState();
  const Navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const targetDatas = () => {
    const selected = diaryList.find((diary) => diary.id === parseInt(id));
    if (selected) {
      setSelectData(selected);
    } else {
      alert("선택된 다이어리가 없습니다.");
      Navigate(`/`, { replace: true });
    }
    return selected;
  };

  useEffect(() => {
    changeTitle(`감정 일기장 - ${id}번 일기 수정`);
    targetDatas();
  }, [diaryList]);
  return (
    <div>
      {selectData && <DiaryEditor selectData={selectData} isEdit={true} />}
    </div>
  );
}

export default EditPage;
