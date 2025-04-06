import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import { Link } from "react-router-dom";

const API_KEY = "4ec8f44f"
const fetchMovie = async (id, setData) => {
    try {
        const result = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await result.json();
        setData(data);
    } catch (error) {
        console.error(error);
    }

};
const MovieDetails = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchMovie(id, setMovie);
        setLoading(false)
    }, [id]);
    return (
        <div className="container">
        <Link to="/">back</Link>
            {loading ? (<Preloader />) : (
                <div className="movies_box">
                    {
                        movie ?
                            (
                                <div className="movie_detail">
                                    <h2>{movie.Title}</h2>
                                    <img src={movie.Poster != "N/A" ? movie.Poster : "/N-A.png"} alt={movie.Title} className="detail_img"/>
                                    <p><span>Run time:</span> {movie.Runtime}</p>
                                    <p><span>Rating:</span> {movie.imdbRating}</p>
                                    <p><span>Year:</span> {movie.Year}</p>
                                    <p><span>Genre:</span> {movie.Genre}</p>
                                    <p><span>Director:</span> {movie.Director}</p>
                                    <p><span>Actors:</span> {movie.Actors}</p>
                                    <p><span>BoxOffice:</span> {movie.BoxOffice}</p>
                                    <p><span>Plot:</span> {movie.Plot}</p>
                                    <div className="ratings">
                                      {movie.ratings ? (
                                        movie.ratings.map((Sourse, Value) => {
                                            (
                                                <p><span>{Sourse}:</span> {Value}</p>
                                            )
                                        })
                                      ) : <Preloader /> }  
                                    </div>
                                </div>
                            ) :
                            <p>Ничего не найдено</p>
                    }
                </div>
            )}
        </div>
    );
};

export default MovieDetails;