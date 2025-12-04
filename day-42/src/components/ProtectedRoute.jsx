import { useGetCurrentUserQuery } from "../services/auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { _, isLoading, error } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
