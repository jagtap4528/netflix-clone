import { useState } from "react";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import MovieModal from "../components/MovieModal";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const continueMovie = JSON.parse(
  localStorage.getItem("continueWatching")
);

  return (
    <>
      <Navbar />
      <Banner />

      {
  continueMovie && (
    <div style={{ padding: "100px 20px" }}>
      <h2>Continue Watching ▶️</h2>

      <img
        src={continueMovie.Poster}
        alt={continueMovie.Title}
        width="180"
      />

      <p>{continueMovie.Title}</p>
    </div>
  )
}

      <Row
        title="Trending"
        query="Avengers"
        onMovieSelect={setSelectedMovie}
      />

      <Row
        title="Action"
        query="Batman"
        onMovieSelect={setSelectedMovie}
      />

      <Row
        title="Comedy"
        query="Comedy"
        onMovieSelect={setSelectedMovie}
      />

      <Row
        title="Sci-Fi"
        query="Star Wars"
        onMovieSelect={setSelectedMovie}
      />

      <Row
        title="Horror"
        query="Conjuring"
        onMovieSelect={setSelectedMovie}
      />

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}

export default Home;