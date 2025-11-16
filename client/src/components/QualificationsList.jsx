import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { list, remove } from '../api/api-qualification.js';
import auth from '../auth/auth-helper.js';

export default function QualificationsList() {
    const [qualifications, setQualifications] = useState([]);
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();

    // Check if user is admin (hardcoded admin email)
    const isAdmin = jwt && jwt.user && jwt.user.email === 'admin@portfolio.com';

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                setQualifications(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const deleteQualification = (qualificationId) => {
        if (!window.confirm('Are you sure you want to delete this qualification?')) {
            return;
        }

        remove({ qualificationId: qualificationId }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                setQualifications(qualifications.filter(qual => qual._id !== qualificationId));
            }
        });
    };

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Qualifications/Education List</h2>
                {isAdmin && (
                    <Link
                        to="/qualification/new"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                    >
                        Add New Qualification
                    </Link>
                )}
            </div>

            {qualifications.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No qualifications found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {qualifications.map((qualification) => (
                        <div
                            key={qualification._id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <h3 style={{ marginTop: 0, color: '#333' }}>{qualification.title}</h3>
                            <p><strong>Name:</strong> {qualification.firstname} {qualification.lastname}</p>
                            <p><strong>Email:</strong> {qualification.email}</p>
                            <p><strong>Completion Date:</strong> {qualification.completion ? new Date(qualification.completion).toLocaleDateString() : 'N/A'}</p>
                            <p><strong>Description:</strong> {qualification.description}</p>

                            {isAdmin && (
                                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => navigate(`/qualification/edit/${qualification._id}`)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteQualification(qualification._id)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
