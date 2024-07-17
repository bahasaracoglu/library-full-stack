import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useContext } from "react";

import BookList from "./pages/BookList";
import Login from "./pages/Login";
import AuthContext from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const router = createBrowserRouter([
    { path: "*", element: <Navigate to="/login" /> },
    { path: "/login", element: <Login /> },

    {
      path: "/book-list",
      element: (
        <RequireAuth>
          <BookList />
        </RequireAuth>
      ),
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
