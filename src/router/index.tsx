import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectedOutlet from "./_ProtectedOutlet";

import Home from "@/pages/Home/index.page";
import Login from "@/pages/Login/index.page";
import Admin from "@/pages/Admin/index.page";

import SubjectsCreate from "@/pages/Admin/Subjects/Create/index.page";

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
    path: "/admin",
    element: <ProtectedOutlet />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "subjects",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <div>Subjects Index</div>,
          },
          {
            path: "create",
            element: <SubjectsCreate />,
          },
          {
            path: ":subjectId",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <div>Subject ID + LIST Social Services</div>,
              },
              {
                path: "social-services",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <div>Social Services Index</div>,
                  },
                  {
                    path: "create",
                    element: <div>Social Services CREATE</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
