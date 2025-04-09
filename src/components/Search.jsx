import { useEffect, useState } from "react"

const Search = ({ onSearch, type, setType, types }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [type]);

    const setTypeAndSearch = (type) => {
        setType(type);
    };

    return (
        <div className="container">

            <div className="search">

                <input
                    className="search_input"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key == "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="search_button">Search</button>
            </div>
            <div className="search_filter">
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setTypeAndSearch(types.ALL)}
                        checked={type === types.ALL}
                        />
                    All
                </label>
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setTypeAndSearch(types.FILMS)}
                        checked={type === types.FILMS}
                        />
                    Films
                </label>
                <label>
                    <input
                        name="contentType"
                        type="radio" 
                        onChange={() => setTypeAndSearch(types.SERIALS)}
                        checked={type === types.SERIALS}
                        />
                    Series
                </label>
            </div>
        </div>
    )
};

export default Search
