import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signin } from '../api/api-auth.js';
import auth from '../auth/auth-helper.js';

export default function SignIn() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        };

        signin(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true });
                });
            }
        });
    };

    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return <Navigate to="/" />;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign In</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange('password')}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {values.error && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                    borderRadius: '4px',
                    marginBottom: '20px'
                }}>
                    {values.error}
                </div>
            )}

            <button
                onClick={clickSubmit}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Sign In
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Don't have an account? <a href="/signup" style={{ color: '#007bff' }}>Sign Up</a>
            </p>
        </div>
    );
}
