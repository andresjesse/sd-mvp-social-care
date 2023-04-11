import React from "react";
import AppLayout from "../Layouts/AppLayout";
import i18n from "@/lang";
import { Text, Title } from "@mantine/core";

export default function Admin() {
  return (
    <AppLayout navbarLinkActive="home">
      <Title>Title</Title>
      <Text>{i18n.t("hello")}</Text>
    </AppLayout>
  );
}
