import React from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Flex,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { hasLength, isEmail, useForm } from "@mantine/form";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (form.isValid()) {
      try {
        await login(form.values.email, form.values.password);
        navigate("/admin");
      } catch (e) {
        console.log("Deal error!", e);
        notifications.show({
          title: "Login",
          message: "Erro de autenticação! 🤥",
          color: "red",
        });
      }
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail(),
      password: hasLength({ min: 6 }),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.email) {
      notifications.show({
        title: "Login",
        message: "Please provide a valid email",
        color: "red",
      });
    } else if (errors.password) {
      notifications.show({
        title: "Login",
        message: "Min 6 characters to password",
        color: "red",
      });
    }
  };

  return (
    <Flex w="100%" h="100vmin" align="center" justify="center">
      <Box maw={300} mx="auto">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={form.onSubmit(() => handleLogin(), handleError)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="******"
              defaultValue="secret"
              {...form.getInputProps("password")}
            />

            <Group position="center" mt="md">
              <Button type="submit">Login</Button>
            </Group>
          </form>
        </Card>
      </Box>
    </Flex>
  );
}
