import React from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Button,
  Card,
  Flex,
  Title,
  Text,
  MediaQuery,
  Group,
} from "@mantine/core";
import i18n from "@/lang";
import { useNavigate } from "react-router-dom";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const configurations = [
  {
    name: i18n.t("configuration_page.demands"),
    url: "/admin/configurations/demands/",
    icon: <FontAwesomeIcon icon={faFileCirclePlus} size="xl" />,
  },
];

export default function AdminDemands() {
  const navigate = useNavigate();

  return (
    <AppLayout navbarLinkActive="configurations">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("configuration_page.title")}</Title>

        {configurations && configurations.length > 0 ? (
          configurations.map((configuration, index) => (
            <Card
              mt="md"
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              mb="sm"
            >
              <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
                <Flex
                  mt="md"
                  mb="md"
                  direction="row"
                  gap="md"
                  justify="space-between"
                >
                  <Group>
                    {configuration.icon}
                    <Text>{configuration.name}</Text>
                  </Group>

                  <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
                    <Button
                      onClick={() => {
                        navigate(configuration.url);
                      }}
                    >
                      {i18n.t("configuration_page.edit")}
                    </Button>
                  </MediaQuery>
                </Flex>
              </MediaQuery>
            </Card>
          ))
        ) : (
          <Text mt="md">
            {i18n.t("configuration_page.empty_configurations")}
          </Text>
        )}
      </Card>
    </AppLayout>
  );
}
