import React from "react";

import {
  Accordion,
  Button,
  Card,
  Divider,
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
import AppLoader from "@/pages/Layouts/AppLoader";

import {
  faFileCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/lang";

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

  if (loadingSubject || loadingSocialServices) {
    return <AppLoader />;
  }

  return (
    <AppLayout navbarLinkActive={subjectId} showSocialServicesLink={true}>
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
            <Accordion.Item value={"" + index} key={index}>
              <Accordion.Control>
                <Group noWrap>
                  <FontAwesomeIcon size="xl" icon={faFileCircleCheck} />

                  {/* <Text>{moment(socialService.date).format()}</Text> */}
                  <Text>09/05/23 08:45</Text>

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
                    <Divider
                      variant="dashed"
                      label={i18n.t("social_services_page.forward")}
                    />
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
                <Divider
                  mt="md"
                  variant="dashed"
                  label={i18n.t("social_services_page.origin")}
                />
                <Text mt="md">
                  {i18n.t(
                    "social_services_page.origin_" + socialService.origin
                  )}
                </Text>
                <Divider
                  mt="md"
                  variant="dashed"
                  label={i18n.t("social_services_page.demands")}
                />
                <List mt="md">
                  {socialService.demands.map((demand, index) => (
                    <List.Item key={index}>{demand}</List.Item>
                  ))}
                  {socialService.otherDemand && (
                    <List.Item>{socialService.otherDemand}</List.Item>
                  )}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </AppLayout>
  );
}
