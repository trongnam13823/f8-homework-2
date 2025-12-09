import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import LoadingFallback from "./components/LoadingFallback";
import ErrorBoundary from "./components/ErrorBoundary";

const PropKey = lazy(() => import("./pages/PropKey"));
const CounterPage = lazy(() => import("./pages/Counter"));
const TestError = lazy(() => import("./pages/TestError"));
const Sentry = lazy(() => import("./pages/Sentry"));

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "prop-key",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PropKey />
          </Suspense>
        ),
      },
      {
        path: "counter",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CounterPage />
          </Suspense>
        ),
      },
      {
        path: "test-error",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TestError />
          </Suspense>
        ),
      },
      {
        path: "sentry",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Sentry />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
