import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../auth/auth-helper.js';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = auth.isAuthenticated();

    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
