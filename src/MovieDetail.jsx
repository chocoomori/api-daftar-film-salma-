import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieDetail.css'; // Mengimpor file CSS khusus untuk detail film

const MovieDetail = ({ movieId, onBack }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=af4f8d7c4f3e45b3e74d119004cf66e9&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;

  if (!movie) return <p>Film tidak ditemukan</p>;

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={onBack}>Back to List</button>
      <div className="movie-detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="detail-poster"
        />
        <div className="detail-info">
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;


