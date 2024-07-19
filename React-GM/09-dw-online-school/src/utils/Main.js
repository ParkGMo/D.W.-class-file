import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../components/App";
import CourseListPage from "../pages/CourseListPage";
import QuestionListPage from "../pages/QuestionListPage";
import CoursePage from "../pages/CoursePage";
import Login from "../components/Login";
import WishListPage from "../pages/WishListPage";
import Logout from "../components/Logout";

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            {/* 동적 routing -> 특정 주소에서 제일 끝에 상품명이나 순서만 바뀐다.  */}
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="questions" element={<QuestionListPage />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="wishlist" element={<WishListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
