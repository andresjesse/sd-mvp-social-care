import React, { useEffect, useState } from "react";

import { SocialService } from "@/types/SocialService";
import {
  Accordion,
  Group,
  List,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { FileRef } from "@/types/FileRef";
import useStorage from "@/hooks/useStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import i18n from "@/lang";
import {
  faFileCircleCheck,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";

import FileCarousel from "./_FIleCarousel";

interface _AccordionProps {
  socialServices: SocialService[];
}

export default function index({ socialServices }: _AccordionProps) {
  // eslint-disable-next-line
  const defaultOppenedId = socialServices[0].id!;

  useEffect(() => {
    setSocialServiceOppened(defaultOppenedId);
    updateFiles(defaultOppenedId);
  }, []);

  const theme = useMantineTheme();

  const { subjectId } = useParams();

  const [socialServiceOppened, setSocialServiceOppened] = useState<
    string | null | undefined
  >(null);

  const { listFiles, getFileUrl, loading: filesIsLoading } = useStorage();

  const [files, setFiles] = useState<Array<FileRef> | null>(null);

  const updateFiles = async (socialServiceId: string) => {
    setFiles(null);
    try {
      const files = await listFiles(
        `subjects/${subjectId}/social-services/${socialServiceId}/attachments/`
      );
      const urls = await Promise.all(
        files.map(async (item) => {
          let splitItem = item.split("/");
          const fileName = splitItem[splitItem.length - 1];
          splitItem = item.split(".");
          const fileExtension = splitItem[splitItem.length - 1];
          const fileUrl = await getFileUrl(item);
          const fileRef: FileRef = {
            name: fileName,
            url: fileUrl,
            extension: fileExtension,
          };
          return fileRef;
        })
      );
      urls.length > 0 ? setFiles(urls) : setFiles(null);
    } catch {
      console.log("loading files error");
    }
  };

  return (
    <Accordion
      mt="lg"
      variant="separated"
      radius="md"
      defaultValue={defaultOppenedId}
      onChange={(id) => {
        setSocialServiceOppened(id);
        updateFiles(id + "");
      }}
    >
      {socialServices.map((socialService, index) => (
        <Accordion.Item value={socialService.id + ""} key={index}>
          <Accordion.Control>
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
                <Text fw="700">{i18n.t("social_services_page.forward")}</Text>

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
              {i18n.t("social_services_page.origin_" + socialService.origin)}
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
            {socialServiceOppened == socialService.id && (
              <FileCarousel files={files} isLoading={filesIsLoading} />
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
