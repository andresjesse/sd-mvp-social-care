import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { Title } from "@mantine/core";

export default function Admin() {
  return (
    <AppLayout navbarLinkActive="home">
      <Title>Admin home</Title>
    </AppLayout>
  );
}
