import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useGetDevicesQuery } from "../services/auth";
import { logout, setUser } from "../features/auth/authSlice";
import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user, isSuccess } = useGetCurrentUserQuery();
  useGetDevicesQuery();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch, isSuccess]);

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
          {isSuccess ? (
            <>
              <span className="px-4 py-2 text-gray-700">Hi, {user?.firstName || "User"}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
