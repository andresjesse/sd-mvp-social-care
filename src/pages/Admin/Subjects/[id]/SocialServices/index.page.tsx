import React from "react";

import {
  Accordion,
  Button,
  Card,
  Group,
  List,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { useNavigate, useParams } from "react-router-dom";

import useCollection from "@/hooks/useCollection";
import useDocument from "@/hooks/useDocument";

import { Subject } from "@/types/Subject";
import { SocialService } from "@/types/SocialService";

import AppLayout from "@/pages/Layouts/AppLayout";

import {
  faFileCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/lang";
import moment from "moment";
import PageSkeleton from "./_PageSkeleton";

export default function AdminSocialServicesPage() {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const { subjectId } = useParams();

  const { data: socialServices, loading: loadingSocialServices } =
    useCollection<SocialService>(`subjects/${subjectId}/social-services`);

  const { data: subject, loading: loadingSubject } = useDocument<Subject>(
    "subjects",
    subjectId || ""
  );

  const showSkeleton = loadingSubject || loadingSocialServices;

  return (
    <AppLayout navbarLinkActive={"social-services"}>
      {showSkeleton ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>
            {i18n.t("social_services_page.title")} {subject?.name}
          </Title>
          <Button
            mt="md"
            onClick={() => {
              navigate("create");
            }}
          >
            {i18n.t("social_services_page.create")}
          </Button>
          <Accordion mt="lg" variant="separated" radius="md" defaultValue="0">
            {socialServices.map((socialService, index) => (
              <Accordion.Item value={index.toString()} key={index}>
                <Accordion.Control>
                  <Group noWrap>
                    <FontAwesomeIcon size="xl" icon={faFileCircleCheck} />

                    <Text>
                      {moment(socialService.date).format("DD/MM/YYYY  HH:mm")}
                    </Text>

                    <div>
                      <Text size="sm" color={theme.colors.gray[6]}>
                        SocialWorker
                      </Text>
                    </div>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  {socialService.forward && (
                    <>
                      <Text fw="700">
                        {i18n.t("social_services_page.forward")}
                      </Text>

                      <Paper
                        mt="md"
                        shadow="xs"
                        radius="xs"
                        p="xl"
                        sx={{ backgroundColor: theme.colors.teal[0] }}
                      >
                        <Group>
                          <FontAwesomeIcon icon={faThumbTack} />
                          <Text>{socialService.forward}</Text>
                        </Group>
                      </Paper>
                    </>
                  )}

                  <Text fw="700" mt="md">
                    {i18n.t("social_services_page.origin")}
                    {": "}
                    {i18n.t(
                      "social_services_page.origin_" + socialService.origin
                    )}
                  </Text>

                  <Text fw="700" mt="md">
                    {i18n.t("social_services_page.demands")}
                  </Text>

                  <List>
                    {socialService.demands.map((demand, index) => (
                      <List.Item icon={<div />} key={index} fz="md">
                        {demand}
                      </List.Item>
                    ))}
                    {socialService.otherDemand && (
                      <List.Item icon={<div />} fz="md">
                        {socialService.otherDemand}
                      </List.Item>
                    )}
                  </List>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      )}
    </AppLayout>
  );
}
