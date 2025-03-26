import { useState } from "react"

const Search = ({ onSearch, type, setType, types }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="container">

            <div className="search">

                <input
                    className="search_input"
                    type="text"
                    placeholder="Поиск фильмов"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key == "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="search_button">Поиск</button>
            </div>
            <div className="search_filter">
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setType(types.ALL)}
                        checked={type === types.ALL}
                        />
                    Всё
                </label>
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setType(types.FILMS)}
                        checked={type === types.FILMS}
                        />
                    Фильмы
                </label>
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setType(types.SERIALS)}
                        checked={type === types.SERIALS}
                        />
                    Сериалы
                </label>
            </div>
        </div>
    )
};

export default Search
