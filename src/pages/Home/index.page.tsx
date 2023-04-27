import React from "react";
import i18n from "@/lang";
import { useNavigate } from "react-router-dom";
import { Text, Title, Image, Center, Button } from "@mantine/core";

import useStyles from "./styles";

export default function Home() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Button onClick={() => navigate("/login")}>
          {i18n.t("landing_page.login")}
        </Button>
      </div>

      <div className={classes.wrapper}>
        <Center maw="100%" h={350} mx="auto">
          <div className={classes.body}>
            <Title className={classes.title} c="#1f1037">
              {i18n.t("landing_page.title")}
            </Title>
            <Text fw={500} fz="lg" mb={5} c="#2a2632">
              {i18n.t("landing_page.subtitle")}
            </Text>
            <Text fz="sm" c="#2a2632">
              {i18n.t("landing_page.content")}
            </Text>
          </div>
        </Center>

        <Image src="/images/landing-page-image.svg" className={classes.image} />
      </div>
    </div>
  );
}
