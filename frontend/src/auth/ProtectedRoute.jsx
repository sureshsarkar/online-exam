import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // Allow access to login and register pages even if not logged in
  if (!token && (location.pathname === "/login" || location.pathname === "/register")) {
    return children;
  }

  // Redirect to login if not authenticated and trying to access a protected page
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
