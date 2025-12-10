import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';
import { getAllUsers } from '../utils/bucket';
import { useNavigate } from 'react-router';

export default function LoginSignup() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        Cookies.remove('auth', { path: '/' });
        setIsLoggedIn(false);
        navigate('/login');
    };

    async function handleLogin() {
        setMessage('');

        if (!username || !password) {
            setMessage('Username and password are required.');
            return;
        }

        try {
            const users = await getAllUsers();
            const match = users.find(u => u.username === username);

            if (!match) {
                setMessage('No account exists with that username.');
                return;
            }

            if (match.password !== password) {
                setMessage('Incorrect password.');
                return;
            }

            const token = btoa(JSON.stringify({
                username: match.username,
                _id: match._id
            }));

            Cookies.set('auth', token, { expires: 7 });

            setIsLoggedIn(true);
            navigate('/');
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            setMessage('Login failed — see console.');
        }
    }

    if (isLoggedIn) {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '80px auto', textAlign: 'center' }}>
                <h1>Welcome!</h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '80px auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h1>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label htmlFor="login-username" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Username
                    <input
                        id="login-username"
                        className="signup-input"
                        type="text"
                        // placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    />
                </label>

                <label htmlFor="login-password" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Password
                    <input
                        id="login-password"
                        className="signup-input"
                        type="password"
                        // placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    />
                </label>
            </form>

            <button
                type="button"
                onClick={handleLogin}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '25px',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '25px'
                }}
            >
                Login
            </button>

            {message && (
                <p style={{ marginTop: '15px', textAlign: 'center', color: 'black' }}>
                    {message}
                </p>
            )}

            <p style={{ marginTop: '25px', textAlign: 'center' }}>New Here?</p>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Link 
                    to="/signup"
                    style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        fontSize: '16px'
                    }}
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}
