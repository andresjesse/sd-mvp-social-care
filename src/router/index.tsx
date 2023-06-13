import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectedOutlet from "./_ProtectedOutlet";

import Home from "@/pages/Home/index.page";
import Login from "@/pages/Login/index.page";
import Admin from "@/pages/Admin/index.page";
import AdminSocialServicesPage from "@/pages/Admin/Subjects/[id]/SocialServices/index.page";
import AdminSocialServicesCreatePage from "@/pages/Admin/Subjects/[id]/SocialServices/Create/index.page";
import AdminSocialServicesShowPage from "@/pages/Admin/Subjects/[id]/SocialServices/[id]/index.page";

import AdminSubjectsCreatePage from "@/pages/Admin/Subjects/Create/index.page";
import AdminSubjectsEditPage from "@/pages/Admin/Subjects/Edit/index.page";
import AdminSubjectsShowPage from "@/pages/Admin/Subjects/[id]/index.page";
import AdminSubjectsPage from "@/pages/Admin/Subjects/index.page";
import AdminConfigurationsPage from "@/pages/Admin/Configurations/index.page";
import AdminDemandsPage from "@/pages/Admin/Configurations/Demands/index.page";

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
            element: <AdminSubjectsPage />,
          },
          {
            path: "create",
            element: <AdminSubjectsCreatePage />,
          },
          {
            path: ":subjectId",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <AdminSubjectsShowPage />,
              },
              {
                path: "edit",
                element: <AdminSubjectsEditPage />,
              },
              {
                path: "social-services",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <AdminSocialServicesPage />,
                  },
                  {
                    path: "create",
                    element: <AdminSocialServicesCreatePage />,
                  },
                  {
                    path: ":socialserviceId",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <AdminSocialServicesShowPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "configurations",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <AdminConfigurationsPage />,
          },
          {
            path: "demands",
            element: <AdminDemandsPage />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
