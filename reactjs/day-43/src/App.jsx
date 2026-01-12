import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import GuestRoute from "./components/GuestRoute";
import Home from "./pages/Home";
import HOCDemo from "./pages/HOCDemo";
import RenderPropsDemo from "./pages/RenderPropsDemo";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/hoc" element={<HOCDemo />} />
          <Route path="/render-props" element={<RenderPropsDemo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
