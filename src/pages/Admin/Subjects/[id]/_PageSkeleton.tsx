import React from "react";
import { Card, SimpleGrid, Skeleton } from "@mantine/core";

export default function PageSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton mt="sm" height={30} width="35%" radius="xl" />
      <Skeleton mt="md" height={20} width="25%" radius="lg" />
      <Skeleton mt="md" height={25} width="30%" radius="lg" />
      <Skeleton mt="md" height={20} width="10%" />
      <Skeleton mt="sm" height={35} radius="md" />
      <SimpleGrid cols={2}>
        <Skeleton mt="md" height={20} width="55%" />
        <Skeleton mt="md" height={20} width="25%" />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <Skeleton mt="sm" height={35} />
        <Skeleton mt="sm" height={35} />
      </SimpleGrid>
      <Skeleton mt="md" height={20} width="10%" />
      <Skeleton mt="sm" height={35} radius="md" />
      <Skeleton mt="md" height={25} width="30%" radius="lg" />
      <Skeleton mt="md" height={20} width="5%" />
      <Skeleton mt="sm" height={35} radius="md" />
      <Skeleton mt="md" height={20} width="5%" />
      <Skeleton mt="sm" height={35} radius="md" />
      <Skeleton mt="md" height={20} width="5%" />
      <Skeleton mt="sm" height={35} radius="md" />
    </Card>
  );
}
