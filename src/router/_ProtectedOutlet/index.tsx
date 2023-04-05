import React from "react";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

export default function ProtectedOutlet() {
  const { user, loading } = useAuth();

  if (loading) return <Loader variant="dots" />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
