import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { Card, SimpleGrid, Title } from "@mantine/core";
import i18n from "@/lang";
import CardDashboard from "./_CardDashboard";
import useCollection from "@/hooks/useCollection";
import { Subject } from "@/types/Subject";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const { count: subjectsCount } = useCollection<Subject>("subjects", false);

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("landing_page.title")}</Title>
        <SimpleGrid
          mt="lg"
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <CardDashboard
            count={subjectsCount}
            title={i18n.t("admin_page.subjects")}
            description={i18n.t("admin_page.subjects_attended")}
            icon={faArrowUpRightFromSquare}
            onClickIcon={() => {
              navigate("subjects");
            }}
          />
        </SimpleGrid>
      </Card>
    </AppLayout>
  );
}
