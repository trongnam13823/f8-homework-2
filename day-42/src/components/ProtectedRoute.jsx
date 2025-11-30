import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../services/auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const { _, isLoading, error } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
