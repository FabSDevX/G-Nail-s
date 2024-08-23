import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Contact } from "./page/Contact.jsx";
import { Calendario } from "./page/Calendario/Calendario.jsx";
import { Homepage } from "./page/Homepage.jsx";


import "./index.css";
import "../firebase.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "contacto",
    element: <Contact />,
  },
  {
    path: "calendario",
    element: <Calendario />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
