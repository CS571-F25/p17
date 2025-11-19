import { useContext, useState } from 'react';
import { AuthContext } from '../App';

export default function Signup() {
    const { isLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    if (isLoggedIn) {
        return (
            <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
                <h1>You are already logged in!</h1>
                <p>Please logout to create a new account.</p>
            </div>
        );
    }
    
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
            <h1>Sign Up</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="signup-username" style={{ display: 'block', marginBottom: '5px' }}>
                        Username:
                    </label>
                    <input
                        type="text"
                        id="signup-username"
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
                    <label htmlFor="signup-password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="signup-password"
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
                <div>
                    <label htmlFor="confirm-password" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button
                type="button"
                style={{
                    width: '100%',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    marginTop: '15px'
                }}
            >
                Signup
            </button>
        </div>
    );
}

