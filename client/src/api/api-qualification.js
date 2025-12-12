// API calls for qualification/education CRUD operations

// Use environment variable for API URL, fallback to Vite proxy in development
const API_URL = import.meta.env.VITE_API_URL || '';

const create = async (qualification, credentials) => {
    try {
        let response = await fetch(`${API_URL}/api/qualifications/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(qualification)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const list = async (signal) => {
    try {
        let response = await fetch(`${API_URL}/api/qualifications/`, {
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
        let response = await fetch(`${API_URL}/api/qualifications/${params.qualificationId}`, {
            method: 'GET',
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (params, credentials, qualification) => {
    try {
        let response = await fetch(`${API_URL}/api/qualifications/${params.qualificationId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(qualification)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const remove = async (params, credentials) => {
    try {
        let response = await fetch(`${API_URL}/api/qualifications/${params.qualificationId}`, {
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
