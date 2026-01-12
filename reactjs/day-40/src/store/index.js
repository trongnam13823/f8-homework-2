import { legacy_createStore } from "redux";
import rootReducer from "./rootReducer";

export const store = legacy_createStore(rootReducer);
