import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { getUserRole } from "./adminMenu";

// allowedRoles: array p.sh. ["admin", "manager"]
export default function RoleRoute({ children, allowedRoles }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/signin" replace />;
  }

  const role = getUserRole();

  // Customer s'ka qasje ne admin fare
  if (role === "customer") {
    return <Navigate to="/" replace />;
  }

  // Nese path-i kerkon role specifike dhe useri s'e ka
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
