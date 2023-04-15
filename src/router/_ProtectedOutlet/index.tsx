import React from "react";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import AppLoader from "@/pages/Layouts/AppLoader";

export default function ProtectedOutlet() {
  const { user, loading } = useAuth();

  if (loading) return <AppLoader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
