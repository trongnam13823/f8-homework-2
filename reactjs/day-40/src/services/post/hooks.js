import { actions, usePost } from "@/features/post";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./services";

export function useFetchPost() {
  const dispatch = useDispatch();
  const data = usePost();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => {
        dispatch(actions.setItems(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
}
