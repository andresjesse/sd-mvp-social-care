import React from "react";
import i18n from "@/lang";
import { useNavigate } from "react-router-dom";
import {
  createStyles,
  Text,
  Title,
  Image,
  Center,
  Button,
} from "@mantine/core";

import image from "@/assets/images/landing-page-image.png";
import backgroundImage from "@/assets/images/landing-page-background.png";

const useStyles = createStyles((theme) => ({
  main: {
    height: "100vh",
    backgroundColor: "#a7b8ff59",

    [theme.fn.largerThan("md")]: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "50px",
    },
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "50%",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "70%",
    },

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("md")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  header: {
    display: "flex",
    justifyContent: "end",
    padding: "15px",
    paddingRight: "30px",

    [theme.fn.smallerThan("md")]: {
      paddingRight: "15px",
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Button
          sx={{
            backgroundColor: "#fe7166",
            "&:hover": { backgroundColor: "#ff5a4d !important" },
          }}
          onClick={() => navigate("/login")}
        >
          {i18n.t("login")}
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

        <Image src={image} className={classes.image} />
      </div>
    </div>
  );
}
