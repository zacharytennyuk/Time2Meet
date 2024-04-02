// user can only access route if logged in

import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}