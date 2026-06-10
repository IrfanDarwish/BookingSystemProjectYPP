import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isAdmin = role === 'ADMIN';

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">Booking Event System</div>
                <div className="nav-menu">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/events">Events</Link>
                    {token ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;