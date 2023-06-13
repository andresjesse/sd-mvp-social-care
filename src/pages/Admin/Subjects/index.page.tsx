import React, { useEffect, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Button,
  Card,
  Flex,
  Group,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PageSkeleton from "./_PageSkeleton";

export default function AdminSubjectsPage() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const [searchString, setSearchString] = useState("");
  const {
    filter,
    filterByQueryString,
    loading: loadingSubjects,
  } = useCollection<Subject>("subjects", false);

  const filterSujects = async () => {
    setSubjects(await filter("lastSocialServiceDate", "asc", 10));
  };

  useEffect(() => {
    filterSujects();
  }, []);

  const filterBySearchString = async () => {
    setSubjects(await filterByQueryString("name", searchString));
  };

  const showSkeleton = loadingSubjects;

  return (
    <AppLayout navbarLinkActive="subjects">
      {showSkeleton ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Flex justify="space-between">
            <Title>{i18n.t("subjects_page.title")}</Title>
            <Button
              onClick={() => {
                navigate("create");
              }}
            >
              {i18n.t("subjects_page.create")}
            </Button>
          </Flex>

          <Flex mt="md" mb="md" direction="row" gap="md" wrap="nowrap">
            <Input
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  filterBySearchString();
                }
              }}
              placeholder="Busca"
              style={{ flex: 1 }}
            />
            <Button onClick={filterBySearchString}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Flex>

          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <Card
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
                          {i18n.t(
                            "subjects_create_page.form.fields.relative_name"
                          )}
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
                          {i18n.t(
                            "subjects_create_page.form.fields.birth_date"
                          )}
                          :
                        </Text>
                        <Text span ml="5px">
                          {moment(subject.birthDate).format("DD/MM/YYYY")}
                        </Text>
                      </Text>

                      <Text mt="sm">
                        <Text fw={700} span>
                          {i18n.t(
                            "subjects_create_page.form.fields.last_social_service_date"
                          )}
                          :
                        </Text>
                        <Text span ml="5px">
                          {moment(subject.lastSocialServiceDate).format(
                            "DD/MM/YYYY"
                          )}
                        </Text>
                      </Text>
                    </Flex>

                    <Group sx={{ flex: 1 }}>
                      <Button
                        w="100%"
                        onClick={() => {
                          navigate(`${subject.id}/social-services`);
                        }}
                      >
                        {i18n.t("subjects_page.social_services")}
                      </Button>

                      <Button
                        w="100%"
                        variant="light"
                        onClick={() => {
                          navigate(`${subject.id}`);
                        }}
                      >
                        {i18n.t("subjects_page.show")}
                      </Button>

                      <Button
                        w="100%"
                        variant="outline"
                        onClick={() => {
                          navigate(`${subject.id}/edit`);
                        }}
                      >
                        {i18n.t("subjects_page.edit")}
                      </Button>
                    </Group>
                  </Flex>
                </MediaQuery>
              </Card>
            ))
          ) : (
            <Text mt="md"> {i18n.t("subjects_page.empty_subjects")}</Text>
          )}
        </Card>
      )}
    </AppLayout>
  );
}
