import { Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../App';

export default function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    
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
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                {isLoggedIn ? 'Login' : 'Signup'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

