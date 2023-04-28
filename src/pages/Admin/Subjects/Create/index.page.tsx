import React, { useState } from "react";
import i18n from "@/lang";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Card,
  Flex,
  Select,
  TextInput,
  Title,
  Radio,
  Group,
  Checkbox,
  Button,
  Input,
  SimpleGrid,
  MediaQuery,
  Textarea,
  List,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import i18nEntriesToSelect from "@/helpers/i18nEntriesToSelect";
import type { Subject } from "@/types/Subject";
import { notifications } from "@mantine/notifications";
import { IMaskInput } from "react-imask";
import moment from "moment";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminSubjectsCreatePage() {
  const relativeRelationOptions = i18nEntriesToSelect(
    "subjects_create_page.form.fields.relative_relation_options"
  );

  const colorOptions = i18nEntriesToSelect(
    "subjects_create_page.form.fields.skin_color_options"
  );

  const stateOptions = i18nEntriesToSelect(
    "subjects_create_page.form.fields.address_state_options"
  );

  const incomeOptions = [
    i18n.t("subjects_create_page.form.fields.income_options.none"),
    i18n.t("subjects_create_page.form.fields.income_options.up_to", {
      value: 2900,
    }),
    i18n.t("subjects_create_page.form.fields.income_options.between", {
      value1: 2900,
      value2: 7100,
    }),
    i18n.t("subjects_create_page.form.fields.income_options.between", {
      value1: 7100,
      value2: 22000,
    }),
    i18n.t("subjects_create_page.form.fields.income_options.superior_to", {
      value: 22000,
    }),
  ].map((label, index) => ({ value: index.toString(), label }));

  const chemicalDependencyOptions = Object.entries(
    i18n.t("subjects_create_page.form.fields.chemical_dependency_options")
  ).map((entry) => ({
    value: entry[0],
    label: entry[1],
  }));

  const [hasOtherChemicalDependency, sethasOtherChemicalDependency] =
    useState(false);

  const form = useForm<Subject>({
    initialValues: {
      name: "",
      relativeName: "",
      relativeRelation: "mother",
      birthDate: undefined,
      cpf: "",
      rg: "",
      bornPlace: "",
      originUnit: "",
      destinationUnit: "",
      contactPhone: "",
      contactAddress: "",
      religion: "",
      skinColor: "",
      addressState: "",
      addressCity: "",
      addressDistrict: "",
      addressStreet: "",
      addressNumber: "",
      income: "",
      familyBond: "",
      chemicalDependency: [],
      otherChemicalDependency: "",
      articleSentence: "",
      condemnationStatus: "",
    },

    validate: {
      name: isNotEmpty(
        i18n.t("notifications.subjects_create_page.name_empty_error")
      ),
      relativeName: isNotEmpty(
        i18n.t("notifications.subjects_create_page.relative_name_empty_error")
      ),
      relativeRelation: isNotEmpty(
        i18n.t(
          "notifications.subjects_create_page.relative_relation_empty_error"
        )
      ),
      chemicalDependency: (value) => (
        sethasOtherChemicalDependency(value.includes("other")), null
      ),
      otherChemicalDependency: hasLength(
        {
          min: hasOtherChemicalDependency ? 1 : 0,
        },
        i18n.t(
          "notifications.subjects_create_page.other_chemical_dependency_empty_error"
        )
      ),
    },
  });

  const handleError = () => {
    if (!form.isValid()) {
      notifications.show({
        title: i18n.t("notifications.subjects_create_page.title"),
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
            {!form.isValid("name") && (
              <List.Item>
                {i18n.t("notifications.subjects_create_page.name_empty_error")}
              </List.Item>
            )}
            {!form.isValid("relativeName") && (
              <List.Item>
                {i18n.t(
                  "notifications.subjects_create_page.relative_name_empty_error"
                )}
              </List.Item>
            )}
            {!form.isValid("relativeRelation") && (
              <List.Item>
                {i18n.t(
                  "notifications.subjects_create_page.relative_relation_empty_error"
                )}
              </List.Item>
            )}
            {!form.isValid("otherChemicalDependency") && (
              <List.Item>
                {i18n.t(
                  "notifications.subjects_create_page.other_chemical_dependency_empty_error"
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
        <Title>{i18n.t("subjects_create_page.form.title")}</Title>

        <Input.Label mt="md">
          {i18n.t("subjects_create_page.asterisk_info")}
        </Input.Label>

        <form>
          <Title mt="md" order={2}>
            {i18n.t("subjects_create_page.form.fields.required_information")}
          </Title>

          <TextInput
            mt="md"
            withAsterisk
            label={i18n.t("subjects_create_page.form.fields.name")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("name")}
          />
          <SimpleGrid
            mt="md"
            cols={1}
            breakpoints={[{ minWidth: "sm", cols: 2 }]}
          >
            <TextInput
              withAsterisk
              label={i18n.t("subjects_create_page.form.fields.relative_name")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("relativeName")}
            />

            <Select
              withAsterisk
              label={i18n.t(
                "subjects_create_page.form.fields.relative_relation"
              )}
              placeholder={i18n.t("subjects_create_page.form.pick")}
              data={relativeRelationOptions}
              {...form.getInputProps("relativeRelation")}
            />
          </SimpleGrid>
          <DateInput
            mt="md"
            maxDate={new Date()}
            withAsterisk
            dateParser={(input: string) => {
              return moment(input, "DD/MM/YYYY").toDate();
            }}
            valueFormat="DD/MM/YYYY"
            label={i18n.t("subjects_create_page.form.fields.birth_date")}
            placeholder="00/00/0000"
            {...form.getInputProps("birthDate")}
          />
          <Title mt="md" order={2}>
            {i18n.t("subjects_create_page.form.aditional_info")}
          </Title>
          <Input.Wrapper
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.cpf")}
          >
            <Input
              {...form.getInputProps("cpf")}
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
            />
          </Input.Wrapper>
          <Input.Wrapper
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.rg")}
          >
            <Input
              {...form.getInputProps("rg")}
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
            />
          </Input.Wrapper>
          <TextInput
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.born_place")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("bornPlace")}
          />
          <TextInput
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.origin_unit")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("originUnit")}
          />
          <TextInput
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.destination_unit")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("destinationUnit")}
          />
          <Title mt="md" order={3}>
            {i18n.t("subjects_create_page.form.fields.familiar_contact")}
          </Title>
          <SimpleGrid
            mt="md"
            cols={1}
            breakpoints={[{ minWidth: "sm", cols: 2 }]}
          >
            <Input.Wrapper
              label={i18n.t("subjects_create_page.form.fields.phone")}
            >
              <Input
                {...form.getInputProps("contactPhone")}
                component={IMaskInput}
                mask="{00} 00000-0000"
                placeholder="(00) 00000-0000"
              />
            </Input.Wrapper>

            <TextInput
              label={i18n.t("subjects_create_page.form.fields.address")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("contactAddress")}
            />
          </SimpleGrid>

          <Radio.Group
            mt="md"
            {...form.getInputProps("familyBond")}
            name="family_bond"
            label={i18n.t("subjects_create_page.form.fields.family_bond")}
          >
            <Group mt="xs">
              <Radio
                value="active"
                label={i18n.t(
                  "subjects_create_page.form.fields.family_bond_options.active"
                )}
              />
              <Radio
                value="fragile"
                label={i18n.t(
                  "subjects_create_page.form.fields.family_bond_options.fragile"
                )}
              />
            </Group>
          </Radio.Group>

          <Title mt="md" order={3}>
            {i18n.t("subjects_create_page.form.fields.address")}
          </Title>

          <SimpleGrid
            mt="md"
            cols={1}
            breakpoints={[{ minWidth: "sm", cols: 2 }]}
          >
            <Select
              label={i18n.t("subjects_create_page.form.fields.address_state")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              data={stateOptions}
              {...form.getInputProps("addressState")}
            />

            <TextInput
              label={i18n.t("subjects_create_page.form.fields.address_city")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("addressCity")}
            />

            <TextInput
              label={i18n.t(
                "subjects_create_page.form.fields.address_district"
              )}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("addressDistrict")}
            />

            <TextInput
              label={i18n.t("subjects_create_page.form.fields.address_street")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("addressStreet")}
            />

            <TextInput
              label={i18n.t("subjects_create_page.form.fields.address_number")}
              placeholder={i18n.t("subjects_create_page.form.example")}
              {...form.getInputProps("addressNumber")}
            />
          </SimpleGrid>

          <Title mt="md" order={3}>
            {i18n.t("subjects_create_page.form.fields.demographic_information")}
          </Title>

          <TextInput
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.religion")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("religion")}
          />

          <Select
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.skin_color")}
            placeholder={i18n.t("subjects_create_page.form.pick")}
            data={colorOptions}
            {...form.getInputProps("skinColor")}
          />

          <Select
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.income")}
            placeholder={i18n.t("subjects_create_page.form.pick")}
            data={incomeOptions}
            {...form.getInputProps("income")}
          />

          <Title mt="md" order={3}>
            {i18n.t("subjects_create_page.form.fields.other")}
          </Title>

          <Input.Label my="md">
            {i18n.t("subjects_create_page.form.fields.chemical_dependency")}
          </Input.Label>

          <Checkbox.Group {...form.getInputProps("chemicalDependency")}>
            {chemicalDependencyOptions.map((chemicalDependency, index) => (
              <Checkbox
                mb="md"
                key={index}
                value={chemicalDependency.value}
                label={chemicalDependency.label}
              ></Checkbox>
            ))}

            <Flex mt="md" wrap="wrap" gap="md" align="center">
              <Checkbox
                value="other"
                label={i18n.t(
                  "subjects_create_page.form.fields.chemical_dependency_other"
                )}
              />
              <Textarea
                placeholder={i18n.t(
                  "subjects_create_page.form.fields.chemical_dependency_other_placeholder"
                )}
                {...form.getInputProps("otherChemicalDependency")}
                disabled={!form.values.chemicalDependency.includes("other")}
                minRows={1}
                autosize
                sx={{ flexGrow: 1 }}
              />
            </Flex>
          </Checkbox.Group>

          <TextInput
            mt="md"
            label={i18n.t("subjects_create_page.form.fields.article_sentence")}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("articleSentence")}
          />

          <TextInput
            mt="md"
            label={i18n.t(
              "subjects_create_page.form.fields.condemnation_status"
            )}
            placeholder={i18n.t("subjects_create_page.form.example")}
            {...form.getInputProps("condemnationStatus")}
          />

          <Flex mt="xl" justify="flex-end">
            <MediaQuery largerThan="sm" styles={{ width: "30%" }}>
              <Button w="100%" type="button" onClick={handleSubmit}>
                {i18n.t("subjects_create_page.form.create")}
              </Button>
            </MediaQuery>
          </Flex>
        </form>
      </Card>
    </AppLayout>
  );
}
