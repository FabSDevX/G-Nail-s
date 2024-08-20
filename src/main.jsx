import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact } from "./page/Contact/Contact.jsx";
import "./index.css";
import "../firebase.js";
import { ContactAdmin } from "./page/admin/contacto-admin/ContactAdmin.jsx";
import { AdminManagement } from "./page/admin/managementUser/adminManagement.jsx";
import { CourseCard } from "./component/CourseCard/CourseCard.jsx";
import { AdminNavBar } from "./component/AdminNavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "contacto",
    element: <Contact />,
  },
  {
    path: "contactoAdmin",
    element: <ContactAdmin />,
  },
  {
    path: "card",
    element: <CourseCard />,
  },
  {
    path: "adminManagement",
    element: <AdminManagement />,
  },
  {
    path: "adminNavBar",
    element: <AdminNavBar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
