import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoutes = () => {
  const location = useLocation();
  const Auth = useContext(AuthContext);

  if (Auth === null) {
    return null; // or loading indicator/spinner/etc
  }

  return Auth 
    ? <Outlet />
    : <Navigate to="/" replace state={{ from: location }} />;
}

export default PrivateRoutes