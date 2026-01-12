/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchUser } from "@/services/user";

export default function UsersList() {
  const { isLoading, data } = useFetchUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User List</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
