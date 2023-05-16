import React from "react";
import { Card, Skeleton } from "@mantine/core";

export default function PageSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton height={30} width="35%" mb="xl" />
      <Skeleton mt="xl" height={35} width="9%" radius="md" />
      <Skeleton mt="xl" height={400} radius="md" />
      <Skeleton mt="xl" height={40} radius="md" />
    </Card>
  );
}
