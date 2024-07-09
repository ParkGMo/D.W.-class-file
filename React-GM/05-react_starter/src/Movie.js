import React from "react";
import "./movie.css";

function Movie({ movie }) {
  const { title, medium_cover_image, year, summary, genres, id } = movie;
  return (
    <div className="movie">
      <img className="movie-img" src={medium_cover_image} />
      <div>
        <h2 className="movie-title">{title}</h2>
        <h3 className="movie-year">{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul className="movie-genres">
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
