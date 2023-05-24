import React from "react";
import AppLayout from "../Layouts/AppLayout";
import {
  Card,
  Flex,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import i18n from "@/lang";
import StyledCard from "../Layouts/StyledCard";
import useCollection from "@/hooks/useCollection";
import { Subject } from "@/types/Subject";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyles from "./styles";

export default function Admin() {
  const { classes } = useStyles();

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
          <StyledCard
            onClick={() => {
              navigate("subjects");
            }}
          >
            <Flex justify="space-between" align="flex-start">
              <Text className={classes.count}>{subjectsCount}</Text>
              <UnstyledButton>
                <FontAwesomeIcon
                  color="white"
                  size="xl"
                  icon={faArrowUpRightFromSquare}
                />
              </UnstyledButton>
            </Flex>
            <Text className={classes.title}>
              {i18n.t("admin_page.subjects")}
            </Text>
            <Text className={classes.description}>
              {i18n.t("admin_page.subjects_attended")}
            </Text>
          </StyledCard>
        </SimpleGrid>
      </Card>
    </AppLayout>
  );
}
