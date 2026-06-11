import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authApi';
import '../styles/RegisterPage.css';

function RegisterPage() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    async function handleRegister() {
        if (!name.trim() || !email.trim() || !password.trimEnd()) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const data = await registerUser(name, email, password);
            setSuccess(data.message);
            setTimeout(() => {
                navigate('/login');
            },2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-card-body">
                    <div className="register-card-header">
                        <h1>Register</h1>
                        <p>Secure your events with us!</p>
                        <p>Register now and start booking events!</p>
                    </div>

                    {success && <div className="success-message">{success}</div>}
                    {error && <div className="error-message">{error}</div>}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegister();
                        }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="register-submit-btn" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
