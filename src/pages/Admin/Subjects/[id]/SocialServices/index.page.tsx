import React, { useState } from "react";

import {
  Accordion,
  Button,
  Card,
  Center,
  getStylesRef,
  Group,
  Image,
  List,
  Loader,
  Paper,
  rem,
  Text,
  Title,
  UnstyledButton,
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
import { Carousel } from "@mantine/carousel";
import useStorage from "@/hooks/useStorage";

export default function AdminSocialServicesPage() {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const { listFiles, getFileUrl, loading: imagesIsLoading } = useStorage();

  const [images, setImages] = useState<string[] | null>(null);

  const updateImages = async (socialServiceId: string) => {
    setImages(null);
    try {
      const files = await listFiles(
        `subjects/${subjectId}/social-services/${socialServiceId}`
      );
      const urls = await Promise.all(
        files.map(async (item) => {
          return await getFileUrl(item);
        })
      );
      urls.length > 0 ? setImages(urls) : setImages(null);
    } catch {
      console.log("loading images error");
    }
  };

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
                <Accordion.Control
                  onClick={() => {
                    // eslint-disable-next-line
                    updateImages(socialService.id!);
                  }}
                >
                  <Group>
                    <FontAwesomeIcon size="xl" icon={faFileCircleCheck} />

                    <Text>
                      {moment(socialService.date).format("DD/MM/YYYY  HH:mm")}
                    </Text>

                    <Text size="sm" color={theme.colors.gray[6]}>
                      {i18n.t("social_services_page.created_by")}{" "}
                      {socialService.createdBy}
                    </Text>
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
                  {imagesIsLoading && (
                    <Center>
                      <Loader variant="dots" size="xl" />
                    </Center>
                  )}
                  {images && (
                    <Card mt="md" withBorder>
                      <Text fw="700">
                        {i18n.t("social_services_page.attachments")}
                      </Text>
                      <Carousel
                        mt="md"
                        withIndicators
                        height={200}
                        slideSize="33.333333%"
                        slideGap="xs"
                        align="start"
                        breakpoints={[
                          { maxWidth: "md", slideSize: "50%" },
                          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                        ]}
                        styles={{
                          controls: {
                            ref: getStylesRef("controls"),
                            transition: "opacity 150ms ease",
                            opacity: 0,
                          },
                          root: {
                            "&:hover": {
                              [`& .${getStylesRef("controls")}`]: {
                                opacity: 1,
                              },
                            },
                          },
                          indicator: {
                            width: rem(12),
                            height: rem(4),
                            transition: "width 250ms ease",

                            "&[data-active]": {
                              width: rem(40),
                            },
                          },
                        }}
                        loop
                      >
                        {images?.map((url, index) => (
                          <Carousel.Slide key={index}>
                            <UnstyledButton
                              component="a"
                              target="_blank"
                              href={url}
                            >
                              <Image
                                src={url}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              />
                            </UnstyledButton>
                          </Carousel.Slide>
                        ))}
                      </Carousel>
                    </Card>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      )}
    </AppLayout>
  );
}
