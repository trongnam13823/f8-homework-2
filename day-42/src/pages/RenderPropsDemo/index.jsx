import DataFetcher from "../../components/DataFetcher";

const RenderPropsDemo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demo Render Props - DataFetcher</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posts List Section */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Posts List</h2>
          <DataFetcher url="https://jsonplaceholder.typicode.com/posts?_limit=5">
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-blue-600 font-semibold">Loading...</div>
                  </div>
                );
              }

              if (error) {
                return (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
                );
              }

              return (
                <div className="space-y-3">
                  {data &&
                    data.map((post) => (
                      <div key={post.id} className="bg-white p-3 rounded shadow-sm border border-blue-200">
                        <h3 className="font-semibold text-gray-800">
                          {post.id}. {post.title}
                        </h3>
                      </div>
                    ))}
                </div>
              );
            }}
          </DataFetcher>
        </div>

        {/* Users List Section */}
        <div className="border rounded-lg p-4 bg-green-50">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Users List</h2>
          <DataFetcher url="https://jsonplaceholder.typicode.com/users?_limit=3">
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-green-600 font-semibold">Loading...</div>
                  </div>
                );
              }

              if (error) {
                return (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
                );
              }

              return (
                <div className="space-y-3">
                  {data &&
                    data.map((user) => (
                      <div key={user.id} className="bg-white p-4 rounded shadow-sm border border-green-200">
                        <h3 className="font-bold text-gray-800 mb-1">{user.name}</h3>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Email:</span> {user.email}
                        </p>
                      </div>
                    ))}
                </div>
              );
            }}
          </DataFetcher>
        </div>
      </div>
    </div>
  );
};

export default RenderPropsDemo;
