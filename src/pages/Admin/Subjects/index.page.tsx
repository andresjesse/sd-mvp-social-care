import React, { useEffect, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import { Button, Card, Grid, Input, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import i18n from "@/lang";
import useCollection from "@/hooks/useCollection";
import { Subject } from "@/types/Subject";
import moment from "moment";

export default function AdminSubjectsPage() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const { filterLast } = useCollection<Subject>("subjects", false);

  const filterSujects = async () => {
    setSubjects(await filterLast(10));
  };

  useEffect(() => {
    filterSujects();
  }, []);

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

        {subjects.map((subject, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            mb="sm"
          >
            <Grid>
              <Grid.Col span={10}>
                <Text mt="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.name")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.name}
                  </Text>
                </Text>

                <Text mt="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.relative_name")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.relativeName} (
                    {i18n.t(
                      `subjects_create_page.form.fields.relative_relation_options.${subject.relativeRelation}`
                    )}
                    )
                  </Text>
                </Text>

                <Text mt="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.birth_date")}:
                  </Text>
                  <Text span ml="5px">
                    {moment(subject.birthDate).format("DD/MM/YYYY")}
                  </Text>
                </Text>
              </Grid.Col>

              <Grid.Col md={2} sm={10}>
                <Button
                  w="100%"
                  onClick={() => {
                    navigate(`${subject.id}/social-services`);
                  }}
                >
                  {i18n.t("social_services_page.title")}
                </Button>
              </Grid.Col>
            </Grid>
          </Card>
        ))}
      </Card>
    </AppLayout>
  );
}
