import "./App.css";
import { getMovieList, searchMovie, getGenres } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil daftar film populer dan genre saat pertama kali komponen dimuat
  useEffect(() => {
    getMovieList().then((result) => setPopularMovies(result));
    getGenres().then((result) => setGenres(result));
  }, []);

  // Pencarian film berdasarkan query dan genre
  const search = (query) => {
    setSearchQuery(query);
    searchMovie(query, selectedGenre).then((result) => setPopularMovies(result));
  };

  // Filter genre
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    search(searchQuery); // Update search results based on selected genre
  };

  // Menampilkan daftar film populer
  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => (
      <div className="Movie-wrapper" key={i}>
        <div className="Movie-title">{movie.title}</div>
        <img
          className="Movie-image"
          src={`${import.meta.env.VITE_BASEIMGURL || 'https://image.tmdb.org/t/p/w500'}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="Movie-date">Release: {movie.release_date}</div>
        <div className="Movie-rate">Rating: {movie.vote_average}</div>
      </div>
    ));
  };

  // Menampilkan dropdown filter genre
  const GenreFilter = () => (
    <select onChange={handleGenreChange} value={selectedGenre}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>IDEA MOVIE MANIA</h1>
        <input
          placeholder="Cari film kesayangan..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <GenreFilter />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;


