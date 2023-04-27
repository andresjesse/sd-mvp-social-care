import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { Button, Card, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import i18n from "@/lang";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("landing_page.title")}</Title>
        <Button
          mt="md"
          onClick={() => {
            navigate("subjects");
          }}
        >
          {i18n.t("admin_page.subjects")}
        </Button>
      </Card>
    </AppLayout>
  );
}
