import React, { useRef, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";

import {
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FileButton,
  Group,
  Radio,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
  Input,
  SimpleGrid,
  Flex,
  MediaQuery,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import i18n from "@/lang";

export default function AdminSocialServicesCreatePage() {
  //fetch demands
  const demands = [
    { label: "Demanda 1", value: "Demanda 1" },
    { label: "Demanda 2", value: "Demanda 2" },
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
      demands: [],
      otherDemand: "",
      forward: "",
    },
    validate: {
      date: isNotEmpty(),
      origin: isNotEmpty(),
      demands: hasLength({ min: otherDemand.length > 0 ? 0 : 1 }),
      otherDemand: hasLength({ min: otherDemand.length > 0 ? 6 : 0 }),
    },
  });

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
    <AppLayout navbarLinkActive="subjects">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("social_service_create_page.title")}</Title>

        <Group mt="md" position="apart">
          <Chip checked>{"{Subject: subject}"}</Chip>
          <Chip disabled>{"{Social_worker: user}"}</Chip>
        </Group>

        <Input.Label mt="md">{i18n.t("forms.asterisk_info")}</Input.Label>

        <form
          onSubmit={form.onSubmit((values) => console.log(values), handleError)}
        >
          <DateTimePicker
            mt="md"
            clearable
            withAsterisk
            label={i18n.t("forms.date_and_time")}
            dropdownType="modal"
            {...form.getInputProps("date")}
          />

          <Radio.Group
            mt="md"
            name="origin"
            label={i18n.t("social_service_create_page.form.origin")}
            withAsterisk
            {...form.getInputProps("origin")}
          >
            <Group>
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

          <Checkbox.Group
            label={i18n.t("social_service_create_page.form.demands")}
            mt="md"
            withAsterisk
            {...form.getInputProps("demands")}
          >
            {demands.map((demand, index) => (
              <Checkbox
                key={index}
                mt="md"
                value={demand.value}
                label={demand.label}
              />
            ))}
          </Checkbox.Group>

          <SimpleGrid
            mt="md"
            cols={1}
            breakpoints={[{ minWidth: "sm", cols: 2 }]}
          >
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
              placeholder={i18n.t(
                "social_service_create_page.form.other_demand_placeholder"
              )}
              disabled={!otherDemandChecked}
              {...form.getInputProps("otherDemand")}
              onInput={() => setOtherDemand(form.values.otherDemand)}
            />
          </SimpleGrid>

          <Textarea
            mt="md"
            label={i18n.t("social_service_create_page.form.forward")}
            placeholder={i18n.t(
              "social_service_create_page.form.forward_placeholder"
            )}
            autosize
            minRows={2}
            maxRows={10}
            {...form.getInputProps("forward")}
          />

          <Group position="center" mt="md">
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              // multiple={true}
              accept="application/pdf,image/png,image/jpeg"
            >
              {(props) => (
                <Button {...props}>{i18n.t("forms.file_upload")}</Button>
              )}
            </FileButton>
            <Button disabled={!file} color="red" onClick={clearFile}>
              Reset
              {/* TODO! add this label to lang! */}
            </Button>
          </Group>

          {file && (
            <Text size="sm" align="center" mt="sm">
              {file.name}
            </Text>
          )}

          {/* <Group mt="md">
            <Button type="submit">{}</Button>
            
          </Group> */}

          <Flex mt="xl" justify="flex-end">
            <MediaQuery largerThan="sm" styles={{ width: "30%" }}>
              <Button w="100%" type="submit">
                {i18n.t("forms.create")}
              </Button>
            </MediaQuery>
          </Flex>
        </form>
      </Card>
    </AppLayout>
  );
}
