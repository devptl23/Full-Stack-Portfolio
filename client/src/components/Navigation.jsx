import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../auth/auth-helper.js';
import { signout } from '../api/api-auth.js';

export default function Navigation() {
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();
    const isAdmin = jwt && jwt.user && jwt.user.email === 'admin@portfolio.com';

    const handleSignout = () => {
        signout().then(() => {
            auth.clearJWT(() => {
                navigate('/');
            });
        });
    };

    return (
        <nav style={{
            backgroundColor: '#343a40',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link
                    to="/"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}
                >
                    Portfolio
                </Link>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
                <Link to="/projects-list" style={{ color: 'white', textDecoration: 'none' }}>Projects</Link>
                <Link to="/qualifications-list" style={{ color: 'white', textDecoration: 'none' }}>Education</Link>
                <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
                {isAdmin && (
                    <Link to="/contacts-list" style={{ color: 'white', textDecoration: 'none' }}>Messages</Link>
                )}
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {!jwt && (
                    <>
                        <Link
                            to="/signin"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px 16px',
                                border: '1px solid white',
                                borderRadius: '4px'
                            }}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            style={{
                                color: '#343a40',
                                backgroundColor: 'white',
                                textDecoration: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
                {jwt && (
                    <>
                        <span style={{ color: 'white' }}>
                            Welcome, {jwt.user.name} {isAdmin && '(Admin)'}
                        </span>
                        <button
                            onClick={handleSignout}
                            style={{
                                color: 'white',
                                backgroundColor: '#dc3545',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
