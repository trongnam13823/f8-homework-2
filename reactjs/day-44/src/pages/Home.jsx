import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>

        <p className="text-gray-600 mb-10">Welcome to the Home Page!</p>

        <ul className="space-y-3">
          <li>
            <Link
              to="/prop-key"
              className="block bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition p-3 rounded-lg shadow-sm"
            >
              Prop Key
            </Link>
          </li>

          <li>
            <Link
              to="/counter"
              className="block bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 hover:text-green-600 transition p-3 rounded-lg shadow-sm"
            >
              Counter
            </Link>
          </li>

          <li>
            <Link
              to="/test-error"
              className="block bg-white border border-gray-200 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition p-3 rounded-lg shadow-sm"
            >
              Test Error
            </Link>
          </li>

          <li>
            <Link
              to="/sentry"
              className="block bg-white border border-gray-200 hover:border-purple-400 hover:bg-red-50 hover:text-purple-400 transition p-3 rounded-lg shadow-sm"
            >
              Sentry
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
