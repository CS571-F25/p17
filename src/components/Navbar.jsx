import { Link, useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext, BucketListContext } from '../App';
import Cookies from 'js-cookie';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext);
    const { setBucketList } = useContext(BucketListContext);
    const navigate = useNavigate();
    const location = useLocation();

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
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#34A7D5' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: 'white', fontWeight: 'bold' }}>VacationRecs</Link>

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
                            <Link 
                                className="nav-link" 
                                to="/" 
                                style={{ 
                                    color: '#003366',
                                    border: location.pathname === '/' ? '2px solid #003366' : 'none',
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/questionnaire" 
                                style={{ 
                                    color: '#003366',
                                    border: location.pathname === '/questionnaire' ? '2px solid #003366' : 'none',
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                }}
                            >
                                Questionnaire
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/bucket-list" 
                                style={{ 
                                    color: '#003366',
                                    border: location.pathname === '/bucket-list' ? '2px solid #003366' : 'none',
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                }}
                            >
                                Bucket List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/locations" 
                                style={{ 
                                    color: '#003366',
                                    border: location.pathname === '/locations' ? '2px solid #003366' : 'none',
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                }}
                            >
                                Locations
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/posts" 
                                style={{ 
                                    color: '#003366',
                                    border: location.pathname === '/posts' ? '2px solid #003366' : 'none',
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                }}
                            >
                                Posts
                            </Link>
                        </li>
                    </ul>

                    {/* RIGHT SIDE */}
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link 
                                    className="nav-link" 
                                    to="/login"
                                    style={{ 
                                        color: '#003366',
                                        border: location.pathname === '/login' ? '2px solid #003366' : 'none',
                                        borderRadius: '8px',
                                        padding: '6px 12px'
                                    }}
                                >
                                    Login / Signup
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    style={{ 
                                        cursor: 'pointer', 
                                        color: '#003366', 
                                        textDecoration: 'none',
                                        borderRadius: '8px',
                                        padding: '6px 12px'
                                    }}
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

