import { actions, useUser } from "@/features/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "./services";

export function useFetchUser() {
  const dispatch = useDispatch();
  const data = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        dispatch(actions.setItems(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
}
