const createStore = (reducer, preloadedState) => {
  let state = reducer(preloadedState, { type: "@@redux/INIT" });
  const listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    },
  };
};

export default createStore;
