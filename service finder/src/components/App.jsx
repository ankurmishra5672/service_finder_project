import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Add_Entry from "./Add_Entry";
import Delete from "./Delete";
import './App.css';

// Create NavLink component with active state
const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
            {children}
        </Link>
    );
};

function App() {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <Router>
            <div className="app-container">
                <div className="title">
                    <i className="fas fa-handshake"></i> 
                    Local Service Finder
                </div>
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <NavLink to="/">
                        <i className="fas fa-home"></i>
                        <span className="nav-text">Home</span>
                    </NavLink>
                    <NavLink to="/login">
                        <i className="fas fa-sign-in-alt"></i>
                        <span className="nav-text">Login</span>
                    </NavLink>
                    <NavLink to="/signup">
                        <i className="fas fa-user-plus"></i>
                        <span className="nav-text">Signup</span>
                    </NavLink>
                    <NavLink to="/add-service">
                        <i className="fas fa-plus-circle"></i>
                        <span className="nav-text">Add Service</span>
                    </NavLink>
                    <NavLink to="/delete">
                        <i className="fas fa-trash-alt"></i>
                        <span className="nav-text">Delete</span>
                    </NavLink>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-service" element={<Add_Entry />} />
                        <Route path="/delete" element={<Delete />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;