import { useState, useEffect } from "react";

export default function LoadingFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600">Đang tải...</p>
    </div>
  );
}
