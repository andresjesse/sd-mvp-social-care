import React from "react";
import { Card, TextInput, Button, Group, Box, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Flex w="100%" h="100vmin" align="center" justify="center">
      <Box maw={300} mx="auto">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              withAsterisk
              label="Password"
              placeholder="******"
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md">
              <Button
                type="submit"
                onClick={() =>
                  notifications.show({
                    title: "Login",
                    message: "Nenhum erro! 🤥",
                  })
                }
              >
                Login
              </Button>
            </Group>
          </form>
        </Card>
      </Box>
    </Flex>
  );
}
