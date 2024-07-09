import React, { useEffect, useState } from "react";
import "./movieApp.css";
import Movie from "./Movie";

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const url =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=&&sort_by=year";
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    // genres, id, medium_cover_image, summary, title, year
    console.log(moviesArr);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="container">
      <div className="movies">
        <Movie />
        <Movie />
      </div>
    </div>
  );
}

export default MovieApp;
