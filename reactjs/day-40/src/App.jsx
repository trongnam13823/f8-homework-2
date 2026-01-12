import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PostsList from "./pages/PostsList";
import { Provider } from "react-redux";
import { store } from "./store";
import UsersList from "./pages/UsersList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/post-list",
    element: <PostsList />,
  },
  {
    path: "/user-list",
    element: <UsersList />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
