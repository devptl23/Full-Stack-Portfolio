// API calls for authentication operations

// Use environment variable for API URL, fallback to Vite proxy in development
const API_URL = import.meta.env.VITE_API_URL || '';

const signin = async (user) => {
    try {
        let response = await fetch(`${API_URL}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const signout = async () => {
    try {
        let response = await fetch(`${API_URL}/api/auth/signout`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { signin, signout };
