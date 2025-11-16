import { useContext, useEffect, useState } from "react";
import ReduxContext from "./Context";

export const useStore = () => {
  const context = useContext(ReduxContext);
  if (!context)
    throw new Error("Could not find react-redux context value; please ensure the component is wrapped in a");

  return context;
};

export const useSelector = (selector) => {
  const store = useStore();
  const getState = () => selector(store.getState());

  if (getState() === store.getState()) {
    console.warn(
      "Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders."
    );
  }

  const [state, setState] = useState(getState);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (getState() !== state) setState(getState());
    });

    return () => unsubscribe();
  }, []);

  return state;
};

export const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};
