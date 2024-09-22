import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css'; // Mengimpor file CSS khusus untuk styling

const MovieList = ({ onMovieSelect, searchResults }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchResults.length === 0) {  // Jika tidak ada hasil pencarian, tampilkan film populer
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=af4f8d7c4f3e45b3e74d119004cf66e9&language=en-US'
        );
        setMovies(response.data.results);
      } else {
        setMovies(searchResults); // Tampilkan hasil pencarian
      }
    };
    fetchMovies();
  }, [searchResults]);

  return (
    <div className="movie-list-container">
      <h2>{searchResults.length > 0 ? 'Search Results' : 'Popular Movies'}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => onMovieSelect(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>Release: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;





