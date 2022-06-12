import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
        <Route 
            {...rest}
            element={(props) => 
                isAuthenticated() && isAuthenticated.role() === 1 ? (
                    <Component {...props} />
                ) : (
                  <Navigate to="/signin" />
                )
            }
        />
  );
};

export default AdminRoute