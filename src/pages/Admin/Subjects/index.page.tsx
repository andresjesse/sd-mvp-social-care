import React from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Button,
  Card,
  Flex,
  Grid,
  Input,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router";
import i18n from "@/lang";
import useCollection from "@/hooks/useCollection";
import { Subject } from "@/types/Subject";
import moment from "moment";

export default function AdminSubjectsPage() {
  const navigate = useNavigate();

  const { data } = useCollection<Subject>("subjects");

  console.log(data[0]);

  return (
    <AppLayout navbarLinkActive="subjects">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("subjects_page.title")}</Title>
        <Grid mt="md" mb="sm">
          <Grid.Col span={6}>
            <Input placeholder="Busca" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              onClick={() => {
                navigate("create");
              }}
            >
              {i18n.t("subjects_page.create")}
            </Button>
          </Grid.Col>
        </Grid>

        {data.map((subject, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            mb="sm"
          >
            <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
              <div>
                <Flex
                  gap="sm"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                >
                  <Text fw={700}>
                    {i18n.t("subjects_create_page.form.fields.name")}:
                  </Text>
                  {subject.name}
                </Flex>
                <Flex
                  gap="sm"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                >
                  <Text fw={700}>
                    {i18n.t("subjects_create_page.form.fields.relative_name")}:
                  </Text>
                  {subject.relativeName} (
                  {i18n.t(
                    `subjects_create_page.form.fields.relative_relation_options.${subject.relativeRelation}`
                  )}
                  )
                </Flex>

                <Flex
                  gap="sm"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                >
                  <Text fw={700}>
                    {i18n.t("subjects_create_page.form.fields.birth_date")}:
                  </Text>

                  {moment(subject.birthDate).format("DD/MM/YYYY")}
                </Flex>
              </div>
            </SimpleGrid>
          </Card>
        ))}
      </Card>
    </AppLayout>
  );
}
