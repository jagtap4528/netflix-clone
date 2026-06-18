import { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails } from "../services/omdb";
import "./Row.css";

function Row({ title, query, onMovieSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(query).then(setMovies);
  }, [query]);

  const handleMovieClick = async (imdbID) => {
    const movie = await fetchMovieDetails(imdbID);

    if (movie) {
      onMovieSelect(movie);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.imdbID}
            src={movie.Poster}
onError={(e) => {
  e.target.src =
    "https://via.placeholder.com/200x300?text=No+Image";
}}
            alt={movie.Title}
            className="row-poster"
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;