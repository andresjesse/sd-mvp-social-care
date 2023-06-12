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
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import i18n from "@/lang";
import {
  faFile,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialService } from "@/types/SocialService";
import useCollection from "@/hooks/useCollection";
import { useNavigate, useParams } from "react-router-dom";
import useDocument from "@/hooks/useDocument";
import { Subject } from "@/types/Subject";
import { Static } from "@/types/Static";
import dateToISOString from "@/helpers/dateToISOString";
import PageSkeleton from "./_PageSkeleton";
import useAuth from "@/hooks/useAuth";
import useStorage from "@/hooks/useStorage";
import { SocialServiceStats } from "@/types/SocialServiceStats";

export default function AdminSocialServicesCreatePage() {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { subjectId } = useParams();

  const { create, loading: loadingSocialServices } =
    useCollection<SocialService>(
      `subjects/${subjectId}/social-services`,
      false
    );

  const {
    data: subject,
    loading: loadingSubject,
    upsert: updateSubject,
  } = useDocument<Subject>("subjects", subjectId || "");

  const { data: demandsData, loading: loadingDemands } = useDocument<
    Static["demands"]
  >("static", "demands");

  const demands = demandsData?.items;

  const { uploadFiles } = useStorage();

  const [hasOtherDemand, setHasOtherDemand] = useState(false);
  const [files, setFiles] = useState<File[] | null>([]);

  const resetRef = useRef<() => void>(null);

  const [uploading, setUploading] = useState(false);

  const clearFiles = () => {
    setFiles(null);
    resetRef.current?.();
  };

  const { data: socialServiceStats, upsert: updateStats } =
    useDocument<SocialServiceStats>("stats", "social-services");

  const form = useForm<SocialService>({
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
                color={theme.colors.red[6]}
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
            {!form.isValid("otherDemand") && (
              <List.Item>
                {i18n.t(
                  "notifications.social_services_create_page.other_demand_empty_error"
                )}
              </List.Item>
            )}
          </List>
        ),
        color: "red",
      });
    }
  };

  const handleSubmit = async () => {
    form.validate();
    handleError();

    if (form.isValid()) {
      setUploading(true);

      try {
        const newId = await create({
          ...form.values,
          date: dateToISOString(form.values.date),
          createdBy: user?.email,
        });

        if (socialServiceStats) {
          updateStats({
            ...socialServiceStats,
            count: socialServiceStats.count + 1,
          });
        }

        if (subject) {
          updateSubject({
            ...subject,
            lastSocialServiceDate: dateToISOString(new Date()),
          });
        }

        await handleUploadFiles(newId);

        notifications.show({
          title: i18n.t("notifications.database_success.title"),
          message: i18n.t("notifications.database_success.send_forms"),
          color: "green",
        });

        navigate("/admin/subjects/");
      } catch (error) {
        notifications.show({
          title: i18n.t("notifications.database_error.title"),
          message: i18n.t("notifications.database_error.send_forms"),
          color: "red",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadFiles = async (socialServiceId: string) => {
    if (subject && socialServiceId && files) {
      const path = `subjects/${subject.id}/social-services/${socialServiceId}/attachments/`;
      await uploadFiles(path, files);
    }
  };

  const handleCancel = () => {
    navigate("/admin/subjects");
  };

  const showSkeleton =
    loadingSubject || loadingSocialServices || loadingDemands;

  return (
    <AppLayout navbarLinkActive={"social-services-create"}>
      {showSkeleton ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>{i18n.t("social_services_create_page.form.title")}</Title>

          <Group mt="md" position="apart">
            <Chip checked>{subject?.name}</Chip>
            <Chip disabled>{user?.email}</Chip>
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
              {demands?.map((demand, index) => (
                <Checkbox key={index} mt="md" value={demand} label={demand} />
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
              <FileButton multiple resetRef={resetRef} onChange={setFiles}>
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
                          color={theme.colors.gray[4]}
                          size="xl"
                          icon={faFile}
                        />
                      }
                    >
                      {file.name}
                    </List.Item>
                  ))}
                </List>
              </Flex>
            )}

            <MediaQuery largerThan="sm" styles={{ flexDirection: "row" }}>
              <Flex mt="xl" direction="column" gap="md" justify="space-between">
                <MediaQuery largerThan="sm" styles={{ width: "30%" }}>
                  <Button
                    variant="outline"
                    sx={(theme) => ({
                      color: theme.colors.red[6],
                      borderColor: theme.colors.red[6],
                    })}
                    w="100%"
                    type="button"
                    onClick={handleCancel}
                  >
                    {i18n.t("social_services_create_page.form.cancel")}
                  </Button>
                </MediaQuery>

                <MediaQuery largerThan="sm" styles={{ width: "30%" }}>
                  <Button
                    w="100%"
                    type="button"
                    onClick={handleSubmit}
                    disabled={uploading}
                  >
                    {uploading && <Loader size="sm" color="gray" mr="sm" />}

                    {i18n.t("social_services_create_page.form.create")}
                  </Button>
                </MediaQuery>
              </Flex>
            </MediaQuery>
          </form>
        </Card>
      )}
    </AppLayout>
  );
}
