import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import axios from 'axios';
import './App.css';

const App = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State untuk ID film yang dipilih
  const [searchResults, setSearchResults] = useState([]); // State untuk menyimpan hasil pencarian
  const [query, setQuery] = useState(''); // State untuk query input
  const [genres, setGenres] = useState([]); // State untuk daftar genre
  const [selectedGenre, setSelectedGenre] = useState(''); // State untuk genre yang dipilih

  // Fetch daftar genre
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=af4f8d7c4f3e45b3e74d119004cf66e9&language=en-US'
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  // Fetch film berdasarkan query pencarian
  const searchMovies = async () => {
    if (query.length > 0) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=af4f8d7c4f3e45b3e74d119004cf66e9&query=${query}&language=en-US`
      );
      setSearchResults(response.data.results);
    } else {
      setSearchResults([]);
    }
  };

  // Fetch film berdasarkan genre yang dipilih
  const searchByGenre = async (genreId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=af4f8d7c4f3e45b3e74d119004cf66e9&with_genres=${genreId}&language=en-US`
    );
    setSearchResults(response.data.results);
  };

  // Handle perubahan genre di dropdown
  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSelectedGenre(selectedGenreId);
    if (selectedGenreId) {
      searchByGenre(selectedGenreId);
    }
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className="app-container">
      <h1>Movie Finder</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          placeholder="Search for a movie..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={searchMovies}>Search</button>
      </div>

      {/* Dropdown untuk memilih genre */}
      <div className="genre-container">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="genre-select"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tampilkan hasil */}
      {!selectedMovieId ? (
        <MovieList
          onMovieSelect={handleMovieSelect}
          searchResults={searchResults}
        />
      ) : (
        <MovieDetail
          movieId={selectedMovieId}
          onBack={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default App;









