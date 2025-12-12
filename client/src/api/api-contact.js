// API calls for contact CRUD operations

// Use environment variable for API URL, fallback to Vite proxy in development
const API_URL = import.meta.env.VITE_API_URL || '';

const create = async (contact, credentials) => {
    try {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Add authorization only if credentials are provided
        if (credentials && credentials.t) {
            headers['Authorization'] = 'Bearer ' + credentials.t;
        }

        let response = await fetch(`${API_URL}/api/contacts/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(contact)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const list = async (signal) => {
    try {
        let response = await fetch(`${API_URL}/api/contacts/`, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const read = async (params, signal) => {
    try {
        let response = await fetch(`${API_URL}/api/contacts/${params.contactId}`, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (params, credentials, contact) => {
    try {
        let response = await fetch(`${API_URL}/api/contacts/${params.contactId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(contact)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const remove = async (params, credentials) => {
    try {
        let response = await fetch(`${API_URL}/api/contacts/${params.contactId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { create, list, read, update, remove };
