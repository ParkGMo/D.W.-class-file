import React from "react";
import ListPage from "../components/ListPage";
import communityImg from "../assets/community.svg";

function QuestionListPage(props) {
  return <ListPage variant={"community"} img={communityImg}></ListPage>;
}

export default QuestionListPage;
