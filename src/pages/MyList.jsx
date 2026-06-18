import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
  getFavoritesFromFirestore,
} from "../services/firestore";

function MyList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  const loadFavorites = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const favorites =
      await getFavoritesFromFirestore(user.uid);

    setFavorites(favorites);
  };

  loadFavorites();
}, []);

  return (
    <div style={{ padding: "100px 20px" }}>
      <h1>My List ❤️</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {favorites.map((movie) => (
          <div key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              width="180"
            />

            <p>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;