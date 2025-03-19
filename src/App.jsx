import { useState } from 'react';
import Header from "./components/Header";
import Search from "./components/Search";
import './App.css';


const API_KEY = "53fee74b"//"4ec8f44f"
function App() {
  const fetchMovies = async (query) =>{
    
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

    } catch (error) {
      console.error(error);
      
    }
  }
  return(
    <div>
      <Header/>
      <Search onSearch={fetchMovies} />

    </div>
  )
}

export default App
