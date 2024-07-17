import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useState } from "react";

import BookList from "./pages/BookList";

function App() {
  //const { currentUser } = useContext(AuthContext);
  const [applicationInfo, setApplicationInfo] = useState(null);

  //const currentUser = false;
  // console.log(currentUser);
  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/admin" />;
  // };
  const router = createBrowserRouter([
    //{ path: "*", element: <Navigate to="/basvuru-olustur" /> },

    {
      path: "/book-list",
      element: <BookList />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
