import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/auth";
import { logout } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const { data, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyApp
        </Link>
        <div className="flex gap-3">
          {!token || isLoading ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
              </Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2 text-gray-700">Hi, {data?.data?.firstName || "User"}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
