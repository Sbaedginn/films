import { useState } from "react"

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {      
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="search_container">
            <input
            type="text"
            placeholder="Поиск фильмов"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} >Поиск</button>
        </div>
    )
};

export default Search
