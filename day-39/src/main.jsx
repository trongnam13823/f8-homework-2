import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReduxProvider from "./libs/react-redux/Provider.jsx";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
