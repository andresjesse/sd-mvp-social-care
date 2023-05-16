import React from "react";
import { Card, Skeleton } from "@mantine/core";

export default function PageSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton height={30} width="35%" mb="xl" />
      <Skeleton mt="xl" height={30} width="6%" radius="xl" />
      <Skeleton mt="md" height={20} width="25%" radius="xl" />
      <Skeleton mt="xl" height={20} width="10%" radius="xl" />
      <Skeleton mt="xs" height={35} radius="sm" />
      <Skeleton mt="xl" height={20} width="10%" radius="xl" />
      <Skeleton mt="xs" height={20} width="25%" radius="sm" />
      <Skeleton mt="xl" height={20} width="10%" radius="xl" />
      <Skeleton mt="xs" height={20} width="25%" radius="sm" />
      <Skeleton mt="xs" height={20} width="20%" radius="sm" />
      <Skeleton mt="xs" height={20} width="35%" radius="sm" />
      <Skeleton mt="xs" height={20} width="30%" radius="sm" />
      <Skeleton mt="xl" height={50} width="25%" radius="sm" />
    </Card>
  );
}
