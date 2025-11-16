import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { list, remove } from '../api/api-contact.js';
import auth from '../auth/auth-helper.js';

export default function ContactsList() {
    const [contacts, setContacts] = useState([]);
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
                setContacts(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const deleteContact = (contactId) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        remove({ contactId: contactId }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                setContacts(contacts.filter(contact => contact._id !== contactId));
            }
        });
    };

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Contact Messages</h2>
            </div>

            {!isAdmin && (
                <div style={{
                    padding: '15px',
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    color: '#856404'
                }}>
                    <strong>Note:</strong> Only administrators can view and manage contact messages.
                </div>
            )}

            {isAdmin && contacts.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666' }}>No contact messages found.</p>
            )}

            {isAdmin && contacts.length > 0 && (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <h3 style={{ marginTop: 0, color: '#333' }}>
                                {contact.firstname} {contact.lastname}
                            </h3>
                            <p><strong>Email:</strong> {contact.email}</p>

                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => deleteContact(contact._id)}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
