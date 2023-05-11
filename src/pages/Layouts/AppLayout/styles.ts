import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  headerTitle: {
    fontFamily: "Dancing Script, cursive",
  },

  navbarLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.md,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontWeight: 400,
    color: theme.colors.gray[7],
    borderRadius: theme.defaultRadius,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        /* eslint-disable */
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background!,
        /* eslint-enable */
        0.9
      ),
      color: theme.black,
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
        0.8
      ),
      color: theme.black,
    },
  },

  navbarLinkGroup: {
    padding: "4px",
    border: "1px solid",
    borderColor: theme.fn.lighten(
      /* eslint-disable */
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      /* eslint-enable */
      0.9
    ),
    borderRadius: theme.defaultRadius,
  },
}));

export default useStyles;
