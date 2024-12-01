import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../Components/login/login.jsx";
import Signup from "../Components/signUp/signUp.jsx";
import Dashboard from "../Components/pages/Dashboard.jsx";
import NotesContainer from "../Components/NoteCard/NoteContainer.jsx";
import TrashContainer from "../Components/Trash/TrashContainer.jsx";
import ArchiveContainer from "../Components/archive/ArchiveContainer.jsx";

import { AuthRoute } from "./AuthRoute.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

function RoutingModule() {
  const AppRoutes = createBrowserRouter([
    {
      path: "/signup",
      element: <AuthRoute><Signup /></AuthRoute>,
    },
    {
      path: "/login",
      element: <AuthRoute><Login /></AuthRoute>,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      children: [
        {
          path: "notes", // Relative path, no leading slash
          element: <NotesContainer />,
        },
        {
          path: "archive", // Relative path, no leading slash
          element: <ArchiveContainer />,
        },
        {
          path: "trash", // Relative path, no leading slash
          element: <TrashContainer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={AppRoutes} />;
}

export default RoutingModule;
