import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact } from "./page/Contact/Contact.jsx";
import "./index.css";
import "../firebase.js";
import { ContactAdmin } from "./page/admin/contacto-admin/ContactAdmin.jsx";
import { AdminManagement } from "./page/admin/managementUser/adminManagement.jsx";
import { AdminNavBar } from "./component/AdminNavBar.jsx";
import { CourseAdmin } from "./page/admin/courseAdmin/CourseAdmin.jsx";
import { CourseAddEdit } from "./component/courseAdmin/CourseAddEdit.jsx";

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
    path: "adminManagement",
    element: <AdminManagement />,
  },
  {
    path: "adminNavBar",
    element: <AdminNavBar />,
  },
  {
    path: "courseAdmin",
    element: <CourseAdmin />,
  },
  {
    path: "editando",
    element: <CourseAddEdit uid={"cGu9dEDXnJ19w7IArQJc"} isEditing={false} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
