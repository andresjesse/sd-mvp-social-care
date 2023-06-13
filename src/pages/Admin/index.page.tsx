import React from "react";
import AppLayout from "../Layouts/AppLayout";
import { Card, SimpleGrid, Text, Title } from "@mantine/core";
import i18n from "@/lang";
import StyledCard from "../Layouts/StyledCard";
import useCollection from "@/hooks/useCollection";
import { Subject } from "@/types/Subject";
import { useNavigate } from "react-router-dom";
import useDocument from "@/hooks/useDocument";
import { SocialServiceStats } from "@/types/SocialServiceStats";

export default function Admin() {
  const navigate = useNavigate();

  const { count: subjectsCount } = useCollection<Subject>("subjects", false);

  const { data: socialServiceStats } = useDocument<SocialServiceStats>(
    "stats",
    "social-services"
  );

  const socialServicesCount = socialServiceStats?.count || 0;

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("landing_page.title")}</Title>
        <SimpleGrid
          mt="lg"
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <StyledCard
            onClick={() => {
              navigate("subjects");
            }}
          >
            <Text c="white" fw="bold" fz="2.5rem">
              {subjectsCount}
            </Text>

            <Text c="white" tt="uppercase" fw="bold" fz="md" mt="md">
              {i18n.t("admin_page.subjects")}
            </Text>

            <Text c="white" fz="sm" mt="xs">
              {i18n.t("admin_page.subjects_attended")}
            </Text>
          </StyledCard>

          <StyledCard>
            <Text c="white" fw="bold" fz="2.5rem">
              {socialServicesCount}
            </Text>

            <Text c="white" tt="uppercase" fw="bold" fz="md" mt="md">
              {i18n.t("admin_page.social_services")}
            </Text>

            <Text c="white" fz="sm" mt="xs">
              {i18n.t("admin_page.social_services_performed")}
            </Text>
          </StyledCard>
        </SimpleGrid>
      </Card>
    </AppLayout>
  );
}
