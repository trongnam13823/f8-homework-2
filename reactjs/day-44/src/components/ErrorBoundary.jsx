import { useRouteError, Link } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center space-y-6 border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-bold text-red-600">Đã xảy ra lỗi 😥</h2>

        {/* Message */}
        <p className="text-gray-800">{error instanceof Error ? error.message : "Có lỗi không xác định!"}</p>

        {/* Contact */}
        <div className="text-gray-600 text-sm space-y-1">
          <p>Nếu cần hỗ trợ, hãy liên hệ:</p>

          <p>
            📧{" "}
            <a className="text-blue-600 underline hover:text-blue-700" href="mailto:admin@example.com">
              admin@example.com
            </a>
          </p>

          <p>
            📘{" "}
            <a
              className="text-blue-600 underline hover:text-blue-700"
              href="https://facebook.com/myfanpage"
              target="_blank"
            >
              facebook.com/myfanpage
            </a>
          </p>
        </div>

        {/* Back to home */}
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ⬅️ Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
