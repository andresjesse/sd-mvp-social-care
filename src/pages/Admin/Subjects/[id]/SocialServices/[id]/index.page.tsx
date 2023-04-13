import React from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import i18n from "@/lang";
import { Button, Text, Title } from "@mantine/core";

export default function AdminSocialServicesShowPage() {
  return (
    <AppLayout>
      <Title>Social Service ID</Title>
      <Text>{i18n.t("hello")}</Text>

      <Button>Click me!</Button>
    </AppLayout>
  );
}
