import React from "react";
import { Card, Group, Skeleton } from "@mantine/core";

export default function PageSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart">
        <Skeleton height={35} width="10%" />
        <Skeleton height={35} width="9%" />
      </Group>
      <Group position="apart">
        <Skeleton mt="lg" height={35} width="94%" />
        <Skeleton mt="lg" height={35} width="4%" />
      </Group>
      <Skeleton mt="md" height={160} radius="md" />
      <Skeleton mt="md" height={160} radius="md" />
      <Skeleton mt="md" height={160} radius="md" />
      <Skeleton mt="md" height={160} radius="md" />
    </Card>
  );
}
