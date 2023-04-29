import React from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import { Button, Card, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import i18n from "@/lang";

export default function AdminSubjectsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout navbarLinkActive="subjects">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("subjects_page.title")}</Title>
        <Button
          mt="md"
          onClick={() => {
            navigate("create");
          }}
        >
          {i18n.t("subjects_page.create")}
        </Button>
      </Card>
    </AppLayout>
  );
}
