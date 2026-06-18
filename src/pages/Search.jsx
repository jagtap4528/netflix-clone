import { useState, useEffect } from "react";
import { fetchMovies, fetchMovieDetails } from "../services/omdb";
import MovieModal from "../components/MovieModal";

const trendingSearches = [
  "Avengers",
  "Batman",
  "Interstellar",
  "John Wick",
  "Inception",
];


function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
 
  const recentSearches =
  JSON.parse(localStorage.getItem("recentSearches")) || [];
  
  const handleMovieClick = async (imdbID) => {
  const movie = await fetchMovieDetails(imdbID);

  if (movie) {
    setSelectedMovie(movie);
  }
};

  useEffect(() => {
    const getSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
    
    

      const results = await fetchMovies(query);
      setSuggestions(results.slice(0, 5)); // Top 5 suggestions
    };

    const timer = setTimeout(getSuggestions, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (searchTerm = query) => {
    const results = await fetchMovies(searchTerm);
    
const recent =
  JSON.parse(localStorage.getItem("recentSearches")) || [];

const updatedRecent = [
  searchTerm,
  ...recent.filter((item) => item !== searchTerm),
].slice(0, 5);

localStorage.setItem(
  "recentSearches",
  JSON.stringify(updatedRecent)
);
    setMovies(results);
    setSuggestions([]);
    setQuery(searchTerm);
  };

  return (
    <div style={{ padding: "100px 20px", color: "white" }}>
      <h1>Search Movies 🔍</h1>

      <div style={{ position: "relative", width: "320px" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "5px",
          }}
        />
        {query.length === 0 && (
  <div style={{ marginTop: "20px" }}>
    <h3>🔥 Trending Searches</h3>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {trendingSearches.map((term) => (
        <button
          key={term}
          onClick={() => handleSearch(term)}
        >
          {term}
        </button>
      ))}
    </div>
  </div>
)}
        {recentSearches.length > 0 && (
  <div style={{ marginTop: "30px" }}>
    <h3>🕒 Recent Searches</h3>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {recentSearches.map((term) => (
        <button
          key={term}
          onClick={() => handleSearch(term)}
        >
          {term}
        </button>
      ))}
    </div>
  </div>
)}

        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              width: "100%",
              background: "#181818",
              borderRadius: "5px",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
            {suggestions.map((movie) => (
  <div
    key={movie.imdbID}
    onClick={() => handleSearch(movie.Title)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      cursor: "pointer",
      borderBottom: "1px solid #333",
    }}
  >
    <img
      src={
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/50x75?text=No+Image"
      }
      alt={movie.Title}
      width="50"
      height="75"
    />

    <div>
      <div>{movie.Title}</div>
      <small style={{ color: "#aaa" }}>
        {movie.Year}
      </small>
    </div>
  </div>
))}
          </div>
        )}
      </div>

      <button
        onClick={() => handleSearch()}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
        }}
      >
        Search
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              width="180"
              style={{ cursor: "pointer" }}
  onClick={() => handleMovieClick(movie.imdbID)}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/180x270?text=No+Image";
              }}
            />

            <p
  style={{ cursor: "pointer" }}
  onClick={() => handleMovieClick(movie.imdbID)}
>
  {movie.Title}
</p>
          </div>
        ))}
      </div>
      <MovieModal
  movie={selectedMovie}
  onClose={() => setSelectedMovie(null)}
/>
    </div>
  );
}

export default Search;