import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

function ProtectedRoute({ user, role, children }) {
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Unauthorized />;
  return children;
}

export default ProtectedRoute;
