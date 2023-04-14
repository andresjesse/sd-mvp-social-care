import React from "react";
import AppLayout from "@/pages/Layouts/AppLayout";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Group,
  Radio,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { useForm, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";

export default function AdminSocialServicesCreatePage() {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: hasLength({ min: 6 }),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      console.log("erro");
    }
  };

  return (
    <AppLayout>
      <Flex justify="center">
        <Box w="100vmin" mx="auto">
          <Title>Create</Title>
          <Space h="xl" />
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <form onSubmit={form.onSubmit(() => handleError)}>
              <Group position="apart">
                <Text>Subject: subject</Text>
                <Text>Social-worker: user</Text>
              </Group>
              <Space h="xl" />
              <Divider
                my="xs"
                label="Date and time"
                labelPosition="center"
                variant="dashed"
              />
              <DateTimePicker
                clearable
                defaultValue={new Date()}
                dropdownType="modal"
                maw={400}
                mx="auto"
                withAsterisk
              />
              <Space h="xl" />
              <Divider
                my="xs"
                label="Origin"
                labelPosition="center"
                variant="dashed"
              />
              <Radio.Group name="origin" withAsterisk>
                <Group mt="xs">
                  <Radio value="in" label="internal" />
                  <Radio value="ex" label="external" />
                </Group>
              </Radio.Group>
              <Space h="xl" />
              <Divider
                my="xs"
                label="Demands"
                labelPosition="center"
                variant="dashed"
              />
              <Checkbox value="demand" label="demand" />
              <Space h="xl" />
              <Checkbox value="demand" label="demand" />
              <Space h="xl" />
              <Checkbox value="otherDemandCheck" label="otherDemandCheck" />
              <Space h="xl" />
              <TextInput
                withAsterisk
                placeholder="other..."
                disabled
                {...form.getInputProps("otherDemand")}
              />
              <Space h="xl" />
              <Divider
                my="xs"
                label="Referrals"
                labelPosition="center"
                variant="dashed"
              />
              <Textarea
                placeholder="referrals..."
                autosize
                minRows={2}
                maxRows={10}
              />
              <Space h="xl" />
              <Group mt="md">
                <Button type="submit">Create</Button>
              </Group>
            </form>
          </Card>
          <Text>Campos com asteriscos * são obrigatórios</Text>
        </Box>
      </Flex>
    </AppLayout>
  );
}
