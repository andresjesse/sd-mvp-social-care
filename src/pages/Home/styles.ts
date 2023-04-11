import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    height: "100vh",
    backgroundColor: theme.colors.gray[1],

    [theme.fn.largerThan("md")]: {
      backgroundImage: `url(/images/landing-page-background.svg)`,
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

export default useStyles;
