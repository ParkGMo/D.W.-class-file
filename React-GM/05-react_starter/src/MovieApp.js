import React, { useEffect, useState } from "react";
import "./movieApp.css";
import Movie from "./Movie";

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=&&sort_by=year";
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    // set함수가 붙어있으면 랜더링이 동시에 이루어짐
    setMovies(moviesArr);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="container">
      {isLoading == true ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      )}
    </div>
  );
}

export default MovieApp;
