import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Contact } from "./page/Contact.jsx";
import "./index.css";
import "../firebase.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "contacto",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
