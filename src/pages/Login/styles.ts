import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.gray[1],
    [theme.fn.largerThan("md")]: {
      backgroundImage: `url(/images/landing-page-background.svg)`,
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "50px",
    },
  },
}));

export default useStyles;