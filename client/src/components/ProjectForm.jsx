import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { create, read, update } from '../api/api-project.js';
import auth from '../auth/auth-helper.js';

export default function ProjectForm() {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [values, setValues] = useState({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: '',
        error: '',
        redirectToProjects: false
    });

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        if (projectId) {
            const abortController = new AbortController();
            const signal = abortController.signal;

            read({ projectId: projectId }, signal).then((data) => {
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
    }, [projectId]);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = () => {
        const project = {
            title: values.title || undefined,
            firstname: values.firstname || undefined,
            lastname: values.lastname || undefined,
            email: values.email || undefined,
            completion: values.completion || undefined,
            description: values.description || undefined
        };

        if (projectId) {
            update({ projectId: projectId }, { t: jwt.token }, project).then((data) => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, error: '', redirectToProjects: true });
                }
            });
        } else {
            create(project, { t: jwt.token }).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, error: '', redirectToProjects: true });
                }
            });
        }
    };

    if (values.redirectToProjects) {
        return navigate('/projects-list');
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {projectId ? 'Edit Project' : 'Add New Project'}
            </h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Project Title:
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
                {projectId ? 'Update Project' : 'Add Project'}
            </button>

            <button
                onClick={() => navigate('/projects-list')}
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
