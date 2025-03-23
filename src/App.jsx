import { useState, useEffect } from 'react';
import Header from "./components/Header";
import MovieCard from './components/MovieCard';
import Preloader from "./components/Preloader";
import Search from "./components/Search";
import './App.css';


const API_KEY = "4ec8f44f" //"53fee74b"
const DEFAULT_MOVIES = ["Inception", "The Dark Knight", "Interstellar", "Titanic", "The Matrix"];

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);

    try {
      const promises = DEFAULT_MOVIES.map((title) => fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`).then((res) => res.json()));
      const results = await Promise.all(promises);
      const validMovies = results.map((res) => res.Search?.[0]).filter(Boolean);
      setMovies(validMovies);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error(error);

    }
    setLoading(false);
  }
  return (
    <div className="main">
      <Header />
      <div className="container">
        <Search onSearch={fetchMovies} />
        {loading ? (<Preloader />) : (
          <div className="movies_box">
            {movies.length > 0 ? movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />) : <p>Ничего не найдено</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
