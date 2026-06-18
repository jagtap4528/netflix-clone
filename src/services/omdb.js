import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );

    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};