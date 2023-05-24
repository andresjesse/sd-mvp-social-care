import React from "react";
import { Flex, Text, UnstyledButton, createStyles, rem } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },
}));

interface CardDashboardProps {
  count: number;
  title: string;
  description: string;
  icon?: IconDefinition;
  onClickIcon?: () => void;
}

export default function CardDashboard({
  count,
  title,
  description,
  icon,
  onClickIcon,
}: CardDashboardProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.stat}>
        <Flex justify="space-between" align="flex-start">
          <Text className={classes.count}>{count}</Text>
          {icon && (
            <UnstyledButton onClick={() => onClickIcon?.()}>
              <FontAwesomeIcon color="white" size="xl" icon={icon} />
            </UnstyledButton>
          )}
        </Flex>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}
