import React from "react";

import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Card,
  Image,
  Text,
  getStylesRef,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FileRef } from "@/types/FileRef";
import i18n from "@/lang";
import isImage from "@/helpers/isImage";
import fileExtensionToFontAwesomeIcon from "@/helpers/fileExtensionToFontAwesomeIcon";

interface FileCarouselProps {
  files: Array<FileRef>;
}

export default function FileCarousel({ files }: FileCarouselProps) {
  const theme = useMantineTheme();

  if (files.length == 0)
    return (
      <Card mt="md" withBorder>
        <Text>{i18n.t("social_services_page.no_attachments")}</Text>
      </Card>
    );

  return (
    <Card mt="md" withBorder>
      <Text fw="700">{i18n.t("social_services_page.attachments")}</Text>
      <Carousel
        mt="md"
        withIndicators
        height={250}
        slideSize="10%"
        slideGap="xs"
        loop
        align="start"
        breakpoints={[
          {
            maxWidth: "sm",
            slideSize: "30%",
          },
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
            backgroundColor: theme.fn.lighten(
              /* eslint-disable */
              theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
              }).background!,
              /* eslint-enable */
              0.1
            ),
            width: rem(12),
            height: rem(4),
            transition: "width 250ms ease",

            "&[data-active]": {
              backgroundColor: theme.primaryColor,
              width: rem(40),
            },
          },
        }}
      >
        {files.map((fileRef: FileRef) => (
          <Carousel.Slide key={fileRef.name}>
            <Anchor target="_blank" href={fileRef.url}>
              {isImage(fileRef.extension) ? (
                <Image
                  src={fileRef.url}
                  width={150}
                  height={150}
                  fit="cover"
                  radius="md"
                  caption={fileRef.name}
                />
              ) : (
                <Image
                  src={null}
                  width={150}
                  height={150}
                  fit="cover"
                  radius="md"
                  caption={fileRef.name}
                  withPlaceholder
                  placeholder={
                    <FontAwesomeIcon
                      size="2xl"
                      icon={fileExtensionToFontAwesomeIcon(fileRef.extension)}
                    />
                  }
                />
              )}
            </Anchor>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Card>
  );
}
