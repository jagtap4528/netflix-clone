import "./MovieCard.css";

function MovieCard({ movie, onClick }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <article
      className="movie-card"
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Enter") onClick();
      }}
    >
      <img src={poster} alt={movie.Title} />

      <div className="movie-card-overlay">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </article>
  );
}

export default MovieCard;