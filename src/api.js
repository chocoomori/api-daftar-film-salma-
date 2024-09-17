import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;

export const getMovieList = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  return response.data.results;
};

export const searchMovie = async (query, genre) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&with_genres=${genre}`
  );
  return response.data.results;
};

export const getGenres = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
  return response.data.genres;
};


