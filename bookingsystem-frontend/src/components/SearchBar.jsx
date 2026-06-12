import '../styles/SearchBar.css';
import { useNavigate } from 'react-router-dom';
function SearchBar({ searchTerm, onSearchChange }) {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');


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
            <div>
                {role === 'ADMIN' && (
                <button
                    className="create-event-btn"
                    onClick={() => navigate('/events/new')}
                    type="button"
                >
                    Create Event
                </button>
            )}
            </div>
            
        </div>
    );
}

export default SearchBar;