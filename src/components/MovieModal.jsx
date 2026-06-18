import "./MovieModal.css";
import { auth } from "../firebase/firebase";
import {
  saveFavoritesToFirestore,
  getFavoritesFromFirestore,
} from "../services/firestore";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  localStorage.setItem(
  "continueWatching",
  JSON.stringify(movie)
);

  const handleFavorite = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first.");
    return;
  }

  const favorites =
    await getFavoritesFromFirestore(user.uid);

  const exists = favorites.find(
    (fav) => fav.imdbID === movie.imdbID
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
  } else {
    updatedFavorites = [...favorites, movie];
  }

  await saveFavoritesToFirestore(
    user.uid,
    updatedFavorites
  );

  alert(
    exists
      ? "Removed from My List"
      : "Added to My List"
  );
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>✖</button>

        <h2>{movie.Title}</h2>

        <p>
          <strong>IMDb:</strong> {movie.imdbRating}
        </p>

        <p>
          <strong>Year:</strong> {movie.Year}
        </p>

        <p>{movie.Plot}</p>

        <button onClick={handleFavorite}>
          ❤️ Add / Remove My List
        </button>
      </div>
    </div>
  );
}

export default MovieModal;