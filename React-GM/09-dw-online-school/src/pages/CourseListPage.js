import React from "react";
import ListPage from "../components/ListPage";

function CourseListPage(props) {
  return (
    <ListPage
      $catalog
      head={"모든코스"}
      text={"자체 제작된 코스들로 기초를 쌓으세요."}
    >
      코스리스트페이지
    </ListPage>
  );
}

export default CourseListPage;
