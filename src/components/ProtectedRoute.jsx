import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { agent } = useAuth();
  if (!agent) return <Navigate to="/agent/login" replace />;
  return children;
}