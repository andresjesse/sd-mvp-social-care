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
  Image,
  Space,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { hasLength, isEmail, useForm } from "@mantine/form";
import i18n from "@/lang";

import useStyles from "./styles";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleLogin = async () => {
    try {
      await login(form.values.email, form.values.password);
      navigate("/admin");
    } catch (e) {
      notifications.show({
        title: i18n.t("notifications.login.title"),
        message: i18n.t("notifications.login.auth_error"),
        color: "red",
      });
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
        title: i18n.t("notifications.login.title"),
        message: i18n.t("notifications.login.invalid_email_error"),
        color: "red",
      });
    } else if (errors.password) {
      notifications.show({
        title: i18n.t("notifications.login.title"),
        message: i18n.t("notifications.login.password_min_len_error"),
        color: "red",
      });
    }
  };

  return (
    <div className={classes.main}>
      <Flex w="100%" h="100vmin" align="center" justify="center">
        <Box maw={300} mx="auto">
          <Group position="center">
            <Image
              maw={63}
              src="/images/logo-black.png"
              alt="logo"
              w="63"
              mr="lg"
            />
          </Group>
          <Space h="md" />
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
                {...form.getInputProps("password")}
              />

              <Group position="center" mt="md">
                <Button type="submit">Login</Button>
              </Group>
            </form>
          </Card>
        </Box>
      </Flex>
    </div>
  );
}
