import { useState, useEffect } from 'react';
import Header from "./components/Header";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/movie/:id" element={<MovieDetails/>}/>
      </Routes>
    </Router>
  );
};

export default App;
