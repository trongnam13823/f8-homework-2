function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
