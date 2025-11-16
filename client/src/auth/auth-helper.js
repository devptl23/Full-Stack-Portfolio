// Manages JWT tokens and authentication state in browser storage
const auth = {
    // Save authentication credentials after successful signin
    authenticate(jwt, cb) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        }
        cb();
    },

    // Check if user is authenticated
    isAuthenticated() {
        if (typeof window == "undefined") {
            return false;
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'));
        } else {
            return false;
        }
    },

    // Clear authentication credentials on signout
    clearJWT(cb) {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem('jwt');
        }
        cb();
        // Optional: Make signout call to backend
        // signout().then((data) => {
        //   document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // });
    },

    // Update user info in storage
    updateUser(user, cb) {
        if (typeof window !== "undefined") {
            if (sessionStorage.getItem('jwt')) {
                let auth = JSON.parse(sessionStorage.getItem('jwt'));
                auth.user = user;
                sessionStorage.setItem('jwt', JSON.stringify(auth));
                cb();
            }
        }
    }
};

export default auth;
