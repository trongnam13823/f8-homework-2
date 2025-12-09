import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://55ea8fea9b23e6b7be0a6974eceac6c6@o4510505737977856.ingest.us.sentry.io/4510505738829824",
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")).render(<App />);
