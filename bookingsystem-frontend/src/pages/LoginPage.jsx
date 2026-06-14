import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authApi'
import '../styles/LoginPage.css'

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setLoading(true);
        setError('');
        try{
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            navigate('/events');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-card-body">
                    <div className="login-card-header">
                        <h1>Login</h1>
                        <p>Login to your account and make bookings now!</p>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        >
                            <div className="form-group">
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="submit" className="login-submit-btn" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                    </form>
                    <div 
                        className="login-card-footer" 
                        onClick={() => navigate('/register')}
                        style={{
                            cursor: "pointer",
                            textdecoration: "underline",
                            color: "#007BFF"
                        }}
                        >Join Us Now
                    </div>
                </div>
            </div>
        </div>
    )



}

export default LoginPage;