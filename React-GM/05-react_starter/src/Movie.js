import React from "react";
import "./movie.css";
import tempImg from "./assets/cat1.png";
function Movie(props) {
  return (
    <div className="movie">
      <img className="movie-img" src={tempImg} />
      <div>
        <h2 className="movie-title">
          <span>제목</span>
        </h2>
        <h3 className="movie-year">2024</h3>
        <p>summary..</p>
        <ul className="movie-genres">
          <li>코미디</li>
          <li>액션</li>
          <li>호러</li>
        </ul>
      </div>
    </div>
  );
}

export default Movie;
