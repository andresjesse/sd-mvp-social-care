import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  navbarLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.md,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontWeight: 400,
    color: theme.white,
    borderRadius: theme.defaultRadius,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background!,
        0.1
      ),
    },

    "svg:first-of-type": {
      marginRight: theme.spacing.md,
    },
  },

  navbarLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
      // [`& .${getStylesRef("icon")}`]: {
      //   opacity: 0.9,
      // },
    },
  },
}));

export default useStyles;
