import React, { useEffect, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Button,
  Card,
  Flex,
  Input,
  MediaQuery,
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

  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const { filterLast } = useCollection<Subject>("subjects", false);

  const filterSujects = async () => {
    setSubjects(await filterLast(10, "lastSocialServiceDate"));
  };

  useEffect(() => {
    filterSujects();
  }, []);

  return (
    <AppLayout navbarLinkActive="subjects">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("subjects_page.title")}</Title>

        <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
          <Flex mt="md" mb="md" direction="row" gap="md">
            <Input placeholder="Busca" style={{ flex: 1 }} />

            <Button
              onClick={() => {
                navigate("create");
              }}
            >
              {i18n.t("subjects_page.create")}
            </Button>
          </Flex>
        </MediaQuery>

        {subjects.map((subject, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            mb="sm"
          >
            <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
              <Flex mt="md" mb="md" direction="row" gap="md">
                <Flex direction="column" w="100%">
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
                      {i18n.t("subjects_create_page.form.fields.relative_name")}
                      :
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
                </Flex>

                <Button
                  onClick={() => {
                    navigate(`${subject.id}/social-services`);
                  }}
                >
                  {i18n.t("subjects_page.social_services")}
                </Button>
              </Flex>
            </MediaQuery>
          </Card>
        ))}
      </Card>
    </AppLayout>
  );
}
