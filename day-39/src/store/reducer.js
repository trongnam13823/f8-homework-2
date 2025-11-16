import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./constants";

const initState = { todos: [] };

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case ADD_TODO:
      return { ...state, todos: [{ id: Date.now(), title: payload.title }, ...state.todos] };

    case EDIT_TODO:
      return { ...state, todos: state.todos.map((todo) => (todo.id === payload.id ? payload : todo)) };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter((todo) => todo.id !== payload.id) };

    case "random":
      return { ...state, random: Math.random() };

    default:
      return state;
  }
}
