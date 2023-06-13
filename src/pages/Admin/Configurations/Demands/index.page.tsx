import React, { useEffect, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import { Demand } from "@/types/Demand";
import useDocument from "@/hooks/useDocument";
import {
  Button,
  Card,
  Flex,
  TextInput,
  Title,
  Text,
  MediaQuery,
  List,
  useMantineTheme,
} from "@mantine/core";
import i18n from "@/lang";
import { useForm, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PageSkeleton from "./_PageSkeleton";

export default function AdminDemands() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { data, loading, upsert } = useDocument<Demand>("static", "demands");
  const [demands, setDemands] = useState<Demand>();

  useEffect(() => {
    if (data) {
      setDemands({ id: data.id, items: data.items || [] });
    }
  }, [data]);

  const formNewDemand = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty(
        i18n.t("notifications.demands_create_page.name_empty_error")
      ),
    },
  });

  const handleNewDemandError = () => {
    if (!formNewDemand.isValid()) {
      notifications.show({
        title: i18n.t("notifications.demands_create_page.title"),
        message: (
          <List
            icon={
              <FontAwesomeIcon
                size="sm"
                color={theme.colors.red[6]}
                icon={faTriangleExclamation}
              />
            }
          >
            {!formNewDemand.isValid("name") && (
              <List.Item>
                {i18n.t("notifications.demands_create_page.name_empty_error")}
              </List.Item>
            )}
          </List>
        ),
        color: "red",
      });
    }
  };

  const handleSubmit = async () => {
    formNewDemand.validate();
    handleNewDemandError();

    if (formNewDemand.isValid() && demands) {
      demands.items.push(formNewDemand.values.name);
      setDemands(demands);

      await upsert(demands);

      notifications.show({
        title: i18n.t("notifications.database_success.title"),
        message: i18n.t("notifications.database_success.send_forms"),
        color: "green",
      });

      formNewDemand.reset();
      navigate(`/admin/configurations/demands/`);
    }
  };

  const handleDelete = async (index: number) => {
    if (demands) {
      demands.items.splice(index, 1);
      setDemands(demands);

      await upsert(demands);

      notifications.show({
        title: i18n.t("notifications.database_success.title"),
        message: i18n.t("notifications.database_success.send_forms"),
        color: "green",
      });

      navigate(`/admin/configurations/demands/`);
    }
  };

  const showSkeleton = loading;

  return (
    <AppLayout navbarLinkActive="configurations">
      {showSkeleton ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>{i18n.t("configuration_demands_page.title")}</Title>

          <form>
            <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
              <Flex mt="md" gap="md" align="center" wrap="nowrap">
                <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
                  <TextInput
                    w="90%"
                    withAsterisk
                    label={i18n.t("configuration_demands_page.form.new")}
                    placeholder={i18n.t(
                      "configuration_demands_page.form.example"
                    )}
                    {...formNewDemand.getInputProps("name")}
                  />
                </MediaQuery>

                <MediaQuery
                  smallerThan="sm"
                  styles={{ width: "100%", marginTop: "0" }}
                >
                  <Button mt="xl" type="button" onClick={handleSubmit}>
                    {i18n.t("configuration_demands_page.form.create")}
                  </Button>
                </MediaQuery>
              </Flex>
            </MediaQuery>
          </form>

          {demands && demands.items.length > 0 ? (
            demands.items.map((demand, index) => (
              <Card
                mt="md"
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mb="sm"
              >
                <MediaQuery
                  smallerThan="sm"
                  styles={{ flexDirection: "column" }}
                >
                  <Flex
                    mt="md"
                    mb="md"
                    direction="row"
                    gap="md"
                    justify="space-between"
                  >
                    <Text>{demand}</Text>

                    <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
                      <Button
                        color="red"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        {i18n.t("configuration_demands_page.delete")}
                      </Button>
                    </MediaQuery>
                  </Flex>
                </MediaQuery>
              </Card>
            ))
          ) : (
            <Text mt="md">
              {" "}
              {i18n.t("configuration_demands_page.empty_demands")}{" "}
            </Text>
          )}
        </Card>
      )}
    </AppLayout>
  );
}
