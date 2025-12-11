import { useContext, useState } from 'react';
import { AuthContext, BucketListContext } from '../App';
import { getAllUsers, createUser } from '../utils/bucket';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

export default function Signup() {
    const { isLoggedIn, setIsLoggedIn, setUserId, setUsername: setAuthUsername } = useContext(AuthContext);
    const { setBucketList } = useContext(BucketListContext);

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

        const newUser = await createUser({
            username,
            password,
            favorites: []
        });

        console.log("Create user response:", newUser);

        // The API returns { id: "...", ... } not { _id: "..." }
        const userId = newUser.id || newUser._id;

        if (!userId) {
            console.error("No user ID returned from API:", newUser);
            setMessage('Signup failed - no user ID received');
            return;
        }

        // Create auth token and set cookie
        const token = btoa(JSON.stringify({
            username: username,
            _id: userId
        }));
        Cookies.set('auth', token, { expires: 7 });

        setMessage('Signup successful!');
        setIsLoggedIn(true);
        setUserId(userId);
        setAuthUsername(username);
        setBucketList([]);
        
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '80px auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign Up</h1>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label htmlFor="signup-username" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Username
                    <input
                        id="signup-username"
                        className="signup-input"
                        type="text"
                        // placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    />
                </label>

                <label htmlFor="signup-password" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Password
                    <input
                        id="signup-password"
                        className="signup-input"
                        type="password"
                        // placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    />
                </label>

                <label htmlFor="signup-confirm-password" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Confirm Password
                    <input
                        id="signup-confirm-password"
                        className="signup-input"
                        type="password"
                        // placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    />
                </label>
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
