import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const AdminRoutes = () => {
  const location = useLocation();
  const {isAdmin} = useContext(AuthContext);

  if (isAdmin === null) {
    return  <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return isAdmin 
    ? <Outlet />
    : <Navigate to="/" replace state={{ from: location }} />;
}

export const UserRoutes = () => {
  const location = useLocation();
  const {isAdmin} = useContext(AuthContext);
  if (isAdmin === null) {
    return  <Navigate to="/auth" replace state={{ from: location }} />;
  } else return <Outlet/>
}

export const AuthRoute = () => {
  const location = useLocation();
  const {isAdmin} = useContext(AuthContext);
  return isAdmin == null ? <Outlet/> : <Navigate to="/" replace state={{ from: location }} />
}

