/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchPost } from "@/services/post";

export default function PostsList() {
  const { isLoading, data } = useFetchPost();

  return (
    <div>
      <h1>Post list</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              {post.id}. {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
