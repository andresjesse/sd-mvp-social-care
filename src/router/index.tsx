import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/index.page";
import Login from "../pages/Login/index.page";
import ProtectedOutlet from "./_ProtectedOutlet";
import Admin from "@/pages/Admin/index.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedOutlet />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
