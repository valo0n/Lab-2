import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function AdminRoute({ children }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/signin" replace />;
  }
  if (!authService.isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
}
