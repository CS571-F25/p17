import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { getAllUsers, createUser } from '../utils/bucket';
import { useNavigate } from 'react-router';

export default function Signup() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    if (isLoggedIn) {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
                <h1>You are already logged in!</h1>
                <p>Please logout to create a new account.</p>
            </div>
        );
    }

    async function handleSignup() {
        console.log("SIGNUP BUTTON CLICKED");
        setMessage('');

        if (!username || !password) {
            setMessage('Username and password are required.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const users = await getAllUsers();
        const exists = users.find(u => u.username === username);

        if (exists) {
            setMessage('That username is already taken.');
            return;
        }

        await createUser({
            username,
            password,
            favorites: []
        });

        setMessage('Signup successful!');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsLoggedIn(true);
        navigate('/');
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '80px auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign Up</h1>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    className="signup-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="signup-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="signup-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </form>

            <button
                type="button"
                onClick={handleSignup}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    marginTop: '25px'
                }}
            >
                Signup
            </button>

            {message && (
                <p style={{ marginTop: '15px', textAlign: 'center', color: 'black' }}>
                    {message}
                </p>
            )}
        </div>
    );
}
