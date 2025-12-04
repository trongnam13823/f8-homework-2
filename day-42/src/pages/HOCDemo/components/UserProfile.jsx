import withLoading from "../../../hoc/withLoading";
import { useGetCurrentUserQuery } from "../../../services/auth";

const UserProfile = withLoading(() => {
  const { data: user } = useGetCurrentUserQuery();

  return (
    <div className="p-4 border rounded bg-blue-50">
      <h3 className="font-bold text-lg mb-2">Thông tin người dùng</h3>
      <p>
        <strong>Fullname:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
    </div>
  );
});

export default UserProfile;
