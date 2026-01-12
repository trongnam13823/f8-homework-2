import { useSelector } from "react-redux";

export function usePost() {
  return useSelector((state) => state.post.items);
}
