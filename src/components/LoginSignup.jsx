import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../App';

export default function LoginSignup() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    
    if (isLoggedIn) {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
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
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }
    
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
            <h1>Login</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                    />
                </div>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>New Here?</p>
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

