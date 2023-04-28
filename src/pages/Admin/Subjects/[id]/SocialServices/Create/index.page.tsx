import React, { useRef, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";

import {
  Button,
  Card,
  Checkbox,
  Chip,
  FileButton,
  Group,
  Radio,
  Textarea,
  Title,
  Input,
  Flex,
  MediaQuery,
  List,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import i18n from "@/lang";

import { faFilePdf, faFileImage } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminSocialServicesCreatePage() {
  //fetch demands
  const demands = [
    { label: "Demanda 1", value: "Demanda 1" },
    { label: "Demanda 2", value: "Demanda 2" },
  ];

  const [hasOtherDemand, setHasOtherDemand] = useState(false);

  const [files, setFiles] = useState<File[] | null>([]);
  const resetRef = useRef<() => void>(null);
  const clearFiles = () => {
    setFiles(null);
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
      date: isNotEmpty(
        i18n.t("notifications.social_services_create_page.date_empty_error")
      ),
      origin: isNotEmpty(
        i18n.t("notifications.social_services_create_page.origin_empty_error")
      ),
      demands: hasLength(
        { min: hasOtherDemand ? 0 : 1 },
        i18n.t("notifications.social_services_create_page.demands_empty_error")
      ),
      otherDemand: hasLength(
        { min: hasOtherDemand ? 1 : 0 },
        i18n.t(
          "notifications.social_services_create_page.other_demand_empty_error"
        )
      ),
    },
  });

  const handleError = () => {
    if (!form.isValid()) {
      notifications.show({
        title: i18n.t("notifications.social_services_create_page.title"),
        message: (
          <List
            icon={
              <FontAwesomeIcon
                size="sm"
                color="#FA5252"
                icon={faTriangleExclamation}
              />
            }
          >
            {!form.isValid("date") && (
              <List.Item>
                {i18n.t(
                  "notifications.social_services_create_page.date_empty_error"
                )}
              </List.Item>
            )}
            {!form.isValid("origin") && (
              <List.Item>
                {i18n.t(
                  "notifications.social_services_create_page.origin_empty_error"
                )}
              </List.Item>
            )}
            {!form.isValid("demands") && (
              <List.Item>
                {i18n.t(
                  "notifications.social_services_create_page.demands_empty_error"
                )}
              </List.Item>
            )}
            {!form.isValid("other_demand") && (
              <List.Item>
                {i18n.t(
                  "notifications.social_services_create_page.other_demand_error"
                )}
              </List.Item>
            )}
          </List>
        ),
        color: "red",
      });
    }
  };

  const handleSubmit = () => {
    form.validate();
    handleError();

    if (form.isValid()) {
      console.log("form", form.values);
    }
  };

  return (
    <AppLayout navbarLinkActive="subjects">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("social_services_create_page.form.title")}</Title>

        <Group mt="md" position="apart">
          <Chip checked>{"//subject"}</Chip>

          <Chip disabled>{"//socialWorker"}</Chip>
        </Group>

        <Input.Label mt="md">
          {i18n.t("subjects_create_page.asterisk_info")}
        </Input.Label>

        <form>
          <DateTimePicker
            mt="md"
            clearable
            withAsterisk
            label={i18n.t(
              "social_services_create_page.form.fields.date_and_time"
            )}
            {...form.getInputProps("date")}
          />

          <Radio.Group
            mt="md"
            name="origin"
            label={i18n.t("social_services_create_page.form.fields.origin")}
            withAsterisk
            {...form.getInputProps("origin")}
          >
            <Group>
              <Radio
                value="internal"
                label={i18n.t(
                  "social_services_create_page.form.fields.origin_internal"
                )}
              />

              <Radio
                value="external"
                label={i18n.t(
                  "social_services_create_page.form.fields.origin_external"
                )}
              />
            </Group>
          </Radio.Group>

          <Checkbox.Group
            label={i18n.t("social_services_create_page.form.fields.demands")}
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

          <Flex mt="md" wrap="wrap" gap="md" align="center">
            <Checkbox
              value="other"
              label={i18n.t(
                "social_services_create_page.form.fields.other_demand"
              )}
              onChange={() => {
                setHasOtherDemand(!hasOtherDemand);
              }}
            />

            <Textarea
              placeholder={i18n.t(
                "social_services_create_page.form.fields.other_demand_placeholder"
              )}
              disabled={!hasOtherDemand}
              {...form.getInputProps("otherDemand")}
              sx={{ flexGrow: 1 }}
              minRows={1}
              autosize
            />
          </Flex>

          <Textarea
            mt="md"
            label={i18n.t("social_services_create_page.form.fields.forward")}
            placeholder={i18n.t(
              "social_services_create_page.form.fields.forward_placeholder"
            )}
            autosize
            minRows={2}
            maxRows={10}
            {...form.getInputProps("forward")}
          />

          <Group position="center" mt="md">
            <FileButton
              multiple
              resetRef={resetRef}
              onChange={setFiles}
              accept="application/pdf,image/png,image/jpeg"
            >
              {(props) => (
                <Button {...props}>
                  {i18n.t(
                    "social_services_create_page.form.fields.file_upload"
                  )}
                </Button>
              )}
            </FileButton>

            <Button disabled={!files} color="red" onClick={clearFiles}>
              {i18n.t("social_services_create_page.form.fields.file_reset")}
            </Button>
          </Group>

          {files && (
            <Flex justify="center" mt="md">
              <List spacing="xs" size="xs">
                {files.map((file: File, index) => (
                  <List.Item
                    key={index}
                    icon={
                      <FontAwesomeIcon
                        color={file.type == "application/pdf" ? "red" : "gray"}
                        size="xl"
                        icon={
                          file.type == "application/pdf"
                            ? faFilePdf
                            : faFileImage
                        }
                      />
                    }
                  >
                    {file.name}
                  </List.Item>
                ))}
              </List>
            </Flex>
          )}

          <Flex mt="xl" justify="flex-end">
            <MediaQuery largerThan="sm" styles={{ width: "30%" }}>
              <Button w="100%" type="button" onClick={handleSubmit}>
                {i18n.t("social_services_create_page.form.create")}
              </Button>
            </MediaQuery>
          </Flex>
        </form>
      </Card>
    </AppLayout>
  );
}
