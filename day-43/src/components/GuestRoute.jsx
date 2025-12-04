import { useGetCurrentUserQuery } from "../services/auth";
import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const { data, isLoading, error } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (data && !error) {
    return <Navigate to="/" replace />;
  }

  if (error) {
    return children;
  }

  return children;
}

export default GuestRoute;
