import React, { useRef, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FileButton,
  Flex,
  Group,
  Radio,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import i18n from "@/lang";

export default function AdminSocialServicesCreatePage() {
  //fetch demands
  const demands = [
    { id: "1", value: "Demanda 1" },
    { id: "2", value: "Demanda 2" },
  ];

  const [otherDemandChecked, setOtherDemandChecked] = useState(false);
  const [otherDemand, setOtherDemand] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const form = useForm({
    initialValues: {
      date: new Date(),
      origin: "",
      demands: [{ id: "", value: "" }],
      otherDemand: "",
      forward: "",
    },
    validate: {
      date: isNotEmpty(),
      origin: isNotEmpty(),
      demands: hasLength({ min: otherDemand.length > 0 ? 0 : 2 }),
      otherDemand: hasLength({ min: otherDemand.length > 0 ? 6 : 0 }),
    },
  });

  const checkDemand = (id: string, value: string) => {
    const index = form.values.demands.map((demand) => demand.id).indexOf(id);
    if (index > 0)
      form.values.demands = form.values.demands.filter(
        (demand) => !demand.id.includes(id)
      );
    else {
      const demand = {
        id: id,
        value: value,
      };
      form.values.demands.push(demand);
    }
  };

  const handleError = (errors: typeof form.errors) => {
    if (errors.date) {
      notifications.show({
        title: i18n.t("notifications.social_service_create_page.title"),
        message: i18n.t(
          "notifications.social_service_create_page.date_empty_error"
        ),
        color: "red",
      });
    }
    if (errors.origin) {
      notifications.show({
        title: i18n.t("notifications.social_service_create_page.title"),
        message: i18n.t(
          "notifications.social_service_create_page.origin_empty_error"
        ),
        color: "red",
      });
    }
    if (errors.demands) {
      notifications.show({
        title: i18n.t("notifications.social_service_create_page.title"),
        message: i18n.t(
          "notifications.social_service_create_page.demands_empty_error"
        ),
        color: "red",
      });
    }
    if (errors.otherDemand) {
      notifications.show({
        title: i18n.t("notifications.social_service_create_page.title"),
        message: i18n.t(
          "notifications.social_service_create_page.other_demand_min_len_error"
        ),
        color: "red",
      });
    }
  };

  return (
    <AppLayout>
      <Flex justify="center">
        <Box w="100vmin" mx="auto">
          <Title>{i18n.t("social_service_create_page.title")}</Title>
          <Space h="sm" />
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <form
              onSubmit={form.onSubmit(
                () => console.log("submited"),
                handleError
              )}
            >
              <Group position="apart">
                <Chip checked>{"{Subject: subject}"}</Chip>
                <Chip disabled>{"{Social_worker: user}"}</Chip>
              </Group>
              <Space h="sm" />
              <Divider
                my="xs"
                label={i18n.t("forms.date_and_time")}
                labelPosition="center"
                variant="dashed"
              />
              <Text color="#fa5252" size="sm">
                *
              </Text>
              <DateTimePicker
                clearable
                dropdownType="modal"
                maw={400}
                mx="auto"
                {...form.getInputProps("date")}
              />
              <Space h="sm" />
              <Divider
                my="xs"
                label={i18n.t("social_service_create_page.form.origin")}
                labelPosition="center"
                variant="dashed"
              />
              <Radio.Group
                name="origin"
                label=" "
                withAsterisk
                {...form.getInputProps("origin")}
              >
                <Group mt="xs">
                  <Radio
                    value="internal"
                    label={i18n.t(
                      "social_service_create_page.form.origin_internal"
                    )}
                  />
                  <Radio
                    value="external"
                    label={i18n.t(
                      "social_service_create_page.form.origin_external"
                    )}
                  />
                </Group>
              </Radio.Group>
              <Divider
                my="xs"
                label={i18n.t("social_service_create_page.form.demands")}
                labelPosition="center"
                variant="dashed"
              />
              <Text color="#fa5252" size="sm">
                *
              </Text>
              {demands.map((demand) => (
                <div key={demand.id}>
                  <Checkbox
                    value={demand.id}
                    label={demand.value}
                    onChange={() => {
                      checkDemand(demand.id, demand.value);
                    }}
                  />
                  <Space h="xs" />
                </div>
              ))}
              <Group>
                <Checkbox
                  value="other"
                  label={i18n.t("social_service_create_page.form.other_demand")}
                  onChange={() => {
                    setOtherDemandChecked(!otherDemandChecked);
                    setOtherDemand("");
                    form.values.otherDemand = "";
                  }}
                />

                <TextInput
                  withAsterisk={otherDemandChecked}
                  label=" "
                  placeholder={i18n.t(
                    "social_service_create_page.form.other_demand_placeholder"
                  )}
                  disabled={!otherDemandChecked}
                  {...form.getInputProps("otherDemand")}
                  onInput={() => setOtherDemand(form.values.otherDemand)}
                />
              </Group>
              <Space h="sm" />
              <Divider
                my="xs"
                label={i18n.t("social_service_create_page.form.forward")}
                labelPosition="center"
                variant="dashed"
              />
              <Textarea
                placeholder={i18n.t(
                  "social_service_create_page.form.forward_placeholder"
                )}
                autosize
                minRows={2}
                maxRows={10}
                {...form.getInputProps("forward")}
              />
              <Space h="sm" />
              <Divider my="xs" labelPosition="center" variant="dashed" />
              <Group position="center">
                <FileButton
                  resetRef={resetRef}
                  onChange={setFile}
                  accept="application/pdf,image/png,image/jpeg"
                >
                  {(props) => (
                    <Button {...props}>{i18n.t("forms.file_upload")}</Button>
                  )}
                </FileButton>
                <Button disabled={!file} color="red" onClick={clearFile}>
                  Reset
                </Button>
              </Group>
              {file && (
                <Text size="sm" align="center" mt="sm">
                  {file.name}
                </Text>
              )}
              <Space h="xl" />
              <Group mt="md">
                <Button type="submit">{i18n.t("forms.create")}</Button>
              </Group>
            </form>
          </Card>
          <Text>{i18n.t("forms.asterisk_info")}</Text>
        </Box>
      </Flex>
    </AppLayout>
  );
}
