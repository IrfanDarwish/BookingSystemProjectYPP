import '../styles/SearchBar.css';
function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="search-bar">
        
        <div className="search-input-wrapper">
            
            <span className="search-icon">🔍</span>
            <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            />
            
            {searchTerm && (
            <button
                className="clear-btn"
                onClick={() => onSearchChange("")}
                type="button"
            >
                ✕
            </button>
            )}
        </div>

        </div>
    );
}

export default SearchBar;