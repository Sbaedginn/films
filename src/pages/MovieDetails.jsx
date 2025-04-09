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
        <div className="movie-details-container">
            <Link to="/" className="back-link">Back</Link>
            {loading ? (
                <Preloader />
            ) : (
                movie ? (
                    <div className="movie-card">
                        <div className="poster-section">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "/N-A.png"}
                                alt={movie.Title}
                                className="poster-img"
                            />
                        </div>
                        <div className="info-section">
                            <h2 className="movie-title">{movie.Title}</h2>
                            <p><strong>Year:</strong> {movie.Year}</p>
                            <p><strong>Genre:</strong> {movie.Genre}</p>
                            <p><strong>Runtime:</strong> {movie.Runtime}</p>
                            <p><strong>Rating:</strong> {movie.imdbRating}</p>
                            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
                            <p><strong>Director:</strong> {movie.Director}</p>
                            <p><strong>Actors:</strong> {movie.Actors}</p>
                            <p><strong>Plot:</strong> {movie.Plot}</p>
                            {movie.Ratings && movie.Ratings.length > 0 && (
                                <div className="ratings">
                                    <h4>Ratings:</h4>
                                    {movie.Ratings.map((rating, index) => (
                                        <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="not-found">Movie not found</p>
                )
            )}
        </div>
    );
};

export default MovieDetails;