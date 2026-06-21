import { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails } from "../services/omdb";
import MovieCard from "./MovieCard";
import "./Row.css";

function Row({ title, query, onMovieSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const results = await fetchMovies(query);
      setMovies(results || []);
    };

    loadMovies();
  }, [query]);

  const handleMovieClick = async (imdbID) => {
    const movie = await fetchMovieDetails(imdbID);

    if (movie) {
      onMovieSelect(movie);
    }
  };

  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-row-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>
    </section>
  );
}

export default Row;