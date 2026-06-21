import "./MovieModal.css";
import { auth } from "../firebase/firebase";
import {
  saveFavoritesToFirestore,
  getFavoritesFromFirestore,
} from "../services/firestore";
import { FaPlay, FaPlus, FaTimes, FaStar } from "react-icons/fa";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleFavorite = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    const favorites = await getFavoritesFromFirestore(user.uid);

    const exists = favorites.find(
      (fav) => fav.imdbID === movie.imdbID
    );

    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    await saveFavoritesToFirestore(user.uid, updatedFavorites);

    alert(exists ? "Removed from My List" : "Added to My List");
  };

  const handlePlay = () => {
    localStorage.setItem("continueWatching", JSON.stringify(movie));
    alert(`${movie.Title} added to Continue Watching`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="modal-hero">
          <img src={poster} alt={movie.Title} />

          <div className="modal-hero-gradient" />

          <div className="modal-title-area">
            <h2>{movie.Title}</h2>

            <div className="modal-meta">
              <span className="modal-match">
                <FaStar /> {movie.imdbRating || "N/A"} IMDb
              </span>
              <span>{movie.Year}</span>
              <span>{movie.Rated || "U/A 16+"}</span>
              <span>{movie.Runtime || "Movie"}</span>
            </div>

            <div className="modal-actions">
              <button className="modal-play-btn" onClick={handlePlay}>
                <FaPlay />
                Play
              </button>

              <button
                className="modal-list-btn"
                onClick={handleFavorite}
                title="Add or remove from My List"
              >
                <FaPlus />
                My List
              </button>
            </div>
          </div>
        </div>

        <div className="modal-details">
          <p className="modal-plot">{movie.Plot}</p>

          <div className="modal-info">
            <p>
              <strong>Genre:</strong> {movie.Genre || "Not available"}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director || "Not available"}
            </p>
            <p>
              <strong>Cast:</strong> {movie.Actors || "Not available"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieModal;