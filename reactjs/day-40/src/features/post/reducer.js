import { SET_ITEMS } from "./consts";

const initState = {
  items: [],
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case SET_ITEMS:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
}
