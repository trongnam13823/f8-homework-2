import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../services/auth";
import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  const { data, isLoading, error } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return children;
  }

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
