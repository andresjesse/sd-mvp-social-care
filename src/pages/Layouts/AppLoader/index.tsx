import React from "react";
import { Flex, Loader } from "@mantine/core";

export default function AppLoader() {
  return (
    <Flex w="100%" h="100vmin" align="center" justify="center">
      <Loader variant="dots" size="xl" />
    </Flex>
  );
}
