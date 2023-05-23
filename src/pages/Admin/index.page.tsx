import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { Card, SimpleGrid, Title } from "@mantine/core";
import i18n from "@/lang";
import CardDashboard from "./_CardDashboard";

export default function Admin() {
  //const navigate = useNavigate();

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("landing_page.title")}</Title>
        {/* <Button
          mt="md"
          onClick={() => {
            navigate("subjects");
          }}
        >
          {i18n.t("admin_page.subjects")}
        </Button> */}
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <CardDashboard />
        </SimpleGrid>
      </Card>
    </AppLayout>
  );
}
