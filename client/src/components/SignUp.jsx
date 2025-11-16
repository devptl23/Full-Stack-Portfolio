import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { create } from '../api/api-user.js';

export default function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };

        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: '', success: true });
            }
        });
    };

    if (values.success) {
        return <Navigate to="/signin" />;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign Up</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange('name')}
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
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
                Sign Up
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Already have an account? <a href="/signin" style={{ color: '#007bff' }}>Sign In</a>
            </p>
        </div>
    );
}
