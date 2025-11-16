import ReduxContext from "./Context";

const ReduxProvider = ({ children, store }) => {
  return <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>;
};

export default ReduxProvider;
