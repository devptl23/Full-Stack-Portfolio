import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, read, update } from '../api/api-qualification.js';
import auth from '../auth/auth-helper.js';

export default function QualificationForm() {
    const navigate = useNavigate();
    const { qualificationId } = useParams();
    const [values, setValues] = useState({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: '',
        error: '',
        redirectToQualifications: false
    });

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        if (qualificationId) {
            const abortController = new AbortController();
            const signal = abortController.signal;

            read({ qualificationId: qualificationId }, signal).then((data) => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        title: data.title || '',
                        firstname: data.firstname || '',
                        lastname: data.lastname || '',
                        email: data.email || '',
                        completion: data.completion ? data.completion.split('T')[0] : '',
                        description: data.description || ''
                    });
                }
            });

            return function cleanup() {
                abortController.abort();
            };
        }
    }, [qualificationId]);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = () => {
        const qualification = {
            title: values.title || undefined,
            firstname: values.firstname || undefined,
            lastname: values.lastname || undefined,
            email: values.email || undefined,
            completion: values.completion || undefined,
            description: values.description || undefined
        };

        if (qualificationId) {
            update({ qualificationId: qualificationId }, { t: jwt.token }, qualification).then((data) => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, error: '', redirectToQualifications: true });
                }
            });
        } else {
            create(qualification, { t: jwt.token }).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, error: '', redirectToQualifications: true });
                }
            });
        }
    };

    if (values.redirectToQualifications) {
        return navigate('/qualifications-list');
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {qualificationId ? 'Edit Qualification' : 'Add New Qualification'}
            </h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Qualification Title:
                </label>
                <input
                    id="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange('title')}
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
                    First Name:
                </label>
                <input
                    id="firstname"
                    type="text"
                    value={values.firstname}
                    onChange={handleChange('firstname')}
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
                    Last Name:
                </label>
                <input
                    id="lastname"
                    type="text"
                    value={values.lastname}
                    onChange={handleChange('lastname')}
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
                    Completion Date:
                </label>
                <input
                    id="completion"
                    type="date"
                    value={values.completion}
                    onChange={handleChange('completion')}
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
                    Description:
                </label>
                <textarea
                    id="description"
                    value={values.description}
                    onChange={handleChange('description')}
                    rows="5"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        resize: 'vertical'
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
                {qualificationId ? 'Update Qualification' : 'Add Qualification'}
            </button>

            <button
                onClick={() => navigate('/qualifications-list')}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
                Cancel
            </button>
        </div>
    );
}
