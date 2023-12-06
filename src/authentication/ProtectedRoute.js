import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ component: Component }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    // Redirect to login if there is no auth token
    return <Navigate to="/admin" />;
  }

  return <Component />;
};
