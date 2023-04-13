import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  headerTitle: {
    fontFamily: "Dancing Script, cursive",
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
        /* eslint-disable */
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background!,
        /* eslint-enable */
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
        /* eslint-disable */
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        /* eslint-enable */
        0.15
      ),
    },
  },
}));

export default useStyles;
