import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext, BucketListContext } from '../App';
import Cookies from 'js-cookie';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext);
    const { setBucketList } = useContext(BucketListContext);
    const navigate = useNavigate();

    function handleLogout() {
        // Remove the auth cookie
        Cookies.remove('auth', { path: '/' });
        
        // Clear login state
        setIsLoggedIn(false);
        setUserId(null);
        setUsername(null);
        setBucketList([]);

        // Redirect to login page
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My App</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/questionnaire">Questionnaire</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bucket-list">Bucket List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">Locations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">Posts</Link>
                        </li>
                    </ul>

                    {/* RIGHT SIDE */}
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login / Signup
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

