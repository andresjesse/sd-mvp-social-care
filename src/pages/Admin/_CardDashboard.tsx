import React from "react";
import { Group, Paper, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function CardDashboard() {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <div>
          <Text
            c="dimmed"
            tt="uppercase"
            fw={700}
            fz="xs"
            className={classes.label}
          >
            teste
          </Text>
          <Text fw={700} fz="xl">
            teste
          </Text>
        </div>

        {/* <ThemeIcon
          color="gray"
          variant="light"
          sx={(theme) => ({
            color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
          })}
          size={38}
          radius="md"
        >
          <DiffIcon size="1.8rem" stroke={1.5} />
        </ThemeIcon> */}
      </Group>
      <Text c="dimmed" fz="sm" mt="md">
        <Text component="span" fw={700}>
          10
        </Text>{" "}
        compared to last month
      </Text>
    </Paper>
  );
}
