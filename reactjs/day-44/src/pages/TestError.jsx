import { useEffect } from "react";

function ErrorButton() {
  return (
    <button
      className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 active:scale-95 transition"
      onClick={() => {
        throw new Error("Test error from button click!");
      }}
    >
      Break the world
    </button>
  );
}

export default function TestError() {
  useEffect(() => {
    throw new Error("Test error from useEffect!");
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Test Error Page</h1>
      <p className="text-gray-600 mb-10">Click the button below to trigger a test error and see Sentry in action.</p>
      <ErrorButton />
    </div>
  );
}
