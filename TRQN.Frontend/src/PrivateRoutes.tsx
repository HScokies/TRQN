import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const PrivateRoutes = () => {
  const location = useLocation();
  const Auth = useContext(AuthContext);

  if (Auth === null) {
    return  <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return Auth 
    ? <Outlet />
    : <Navigate to="/" replace state={{ from: location }} />;
}

export const AuthRoute = () => {
  const location = useLocation();
  const Auth = useContext(AuthContext);
  return Auth == null ? <Outlet/> : <Navigate to="/" replace state={{ from: location }} />
}

