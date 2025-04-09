import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie_card">
            <Link to={`/movie/${movie.imdbID}`} className="movie_card_link">
                <img src={movie.Poster != "N/A" ? movie.Poster : "/N-A.png"} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </Link>
        </div>
    );

};

export default MovieCard;