import { useState, useEffect } from 'react';
import Header from "./components/Header";
import MovieCard from './components/MovieCard';
import Preloader from "./components/Preloader";
import Search from "./components/Search";
import './App.css';


const API_KEY = "4ec8f44f" //"53fee74b"
const DEFAULT_MOVIES = ["Inception", "The Dark Knight", "Interstellar", "Titanic", "The Matrix"];
const CONTENT_TYPES = {
  ALL: "all",
  FILMS: "movie",
  SERIALS: "series"
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState(CONTENT_TYPES.ALL);

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
      let response;
      if (contentType === CONTENT_TYPES.ALL) {
        response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      } else {
        response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&type=${contentType}`)
      }
      // const response = await ? fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`) : fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&type=${contentType}`);
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
      <p>{contentType}</p>
      <Search onSearch={fetchMovies} type={contentType} setType={setContentType} types={CONTENT_TYPES} />
      <div className="container">
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
