import React, { useState } from "react";
import i18n from "@/lang";
import AppLayout from "@/pages/Layouts/AppLayout";
import {
  Card,
  Flex,
  Select,
  TextInput,
  Title,
  Divider,
  Radio,
  Group,
  Checkbox,
  Text,
  Button,
  Input,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import i18nEntriesToSelect from "@/helpers/i18nEntriesToSelect";
import type { Subject } from "@/types/Subject";
import { notifications } from "@mantine/notifications";
import { IMaskInput } from "react-imask";
import moment from "moment";

export default function AdminSubjectsCreatePage() {
  const relativeRelationOptions = i18nEntriesToSelect(
    "subjects.form.fields.relative_relation_options"
  );

  const colorOptions = i18nEntriesToSelect(
    "subjects.form.fields.skin_color_options"
  );

  const incomeOptions = [
    i18n.t("subjects.form.fields.income_options.none"),
    i18n.t("subjects.form.fields.income_options.up_to", { value: 2900 }),
    i18n.t("subjects.form.fields.income_options.between", {
      value1: 2900,
      value2: 7100,
    }),
    i18n.t("subjects.form.fields.income_options.between", {
      value1: 7100,
      value2: 22000,
    }),
    i18n.t("subjects.form.fields.income_options.superior_to", { value: 22000 }),
  ].map((label, index) => ({ value: index.toString(), label }));

  const chemicalDependencyOptions = Object.entries(
    i18n.t("subjects.form.fields.chemical_dependency_options")
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

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({
        title: i18n.t("notifications.subjects_create_page.title"),
        message: i18n.t("notifications.subjects_create_page.name_empty_error"),
        color: "red",
      });
    } else if (errors.relativeName) {
      notifications.show({
        title: i18n.t("notifications.subjects_create_page.title"),
        message: i18n.t(
          "notifications.subjects_create_page.relative_name_empty_error"
        ),
        color: "red",
      });
    } else if (errors.relativeRelation) {
      notifications.show({
        title: i18n.t("notifications.subjects_create_page.title"),
        message: i18n.t(
          "notifications.subjects_create_page.relative_relation_empty_error"
        ),
        color: "red",
      });
    } else if (errors.otherChemicalDependency) {
      notifications.show({
        title: i18n.t("notifications.subjects_create_page.title"),
        message: i18n.t(
          "notifications.subjects_create_page.other_chemical_dependency_empty_error"
        ),
        color: "red",
      });
    }
  };

  const handleCreate = async (subject: Subject) => {
    console.log("form");
    console.log(subject);
  };

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("subjects.form.create")}</Title>

        <form
          onSubmit={form.onSubmit(
            (values) => handleCreate(values),
            handleError
          )}
        >
          <TextInput
            w="50%"
            mt="10px"
            withAsterisk
            label={i18n.t("subjects.form.fields.name")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("name")}
          />

          <Flex
            mt="5px"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              w="50%"
              withAsterisk
              label={i18n.t("subjects.form.fields.relative_name")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("relativeName")}
            />

            <Select
              withAsterisk
              label={i18n.t("subjects.form.fields.relative_relation")}
              placeholder={i18n.t("subjects.form.pick")}
              data={relativeRelationOptions}
              {...form.getInputProps("relativeRelation")}
            />
          </Flex>

          <DateInput
            maxDate={new Date()}
            w="50%"
            mt="5px"
            withAsterisk
            dateParser={(input: string) => {
              return moment(input, "DD/MM/YYYY").toDate();
            }}
            valueFormat="DD/MM/YYYY"
            label={i18n.t("subjects.form.fields.birth_date")}
            placeholder="00/00/0000"
            onKeyPress={(event) => {
              if (event.code === "Enter") {
                event.preventDefault();
              }
            }}
            {...form.getInputProps("birthDate")}
          />

          <Input.Wrapper
            label={i18n.t("subjects.form.fields.cpf")}
            w="50%"
            mt="5px"
          >
            <Input
              {...form.getInputProps("cpf")}
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
            />
          </Input.Wrapper>

          <Input.Wrapper
            label={i18n.t("subjects.form.fields.rg")}
            w="50%"
            mt="5px"
          >
            <Input
              {...form.getInputProps("rg")}
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
            />
          </Input.Wrapper>

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.born_place")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("bornPlace")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.origin_unit")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("originUnit")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.destination_unit")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("destinationUnit")}
          />

          <Title mt="5px" order={4}>
            {i18n.t("subjects.form.fields.familiar_contact")}
          </Title>
          <Flex
            w="100%"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              w="50%"
              label={i18n.t("subjects.form.fields.phone")}
              placeholder="(00) 00000-0000"
              {...form.getInputProps("contactPhone")}
            />

            <TextInput
              w="40%"
              label={i18n.t("subjects.form.fields.address")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("contactAddress")}
            />
          </Flex>

          <Title mt="15px">{i18n.t("subjects.form.aditional_info")}</Title>
          <Divider my="sm" />

          <TextInput
            w="50%"
            label={i18n.t("subjects.form.fields.religion")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("religion")}
          />

          <Select
            w="50%"
            label={i18n.t("subjects.form.fields.color")}
            placeholder={i18n.t("subjects.form.pick")}
            data={colorOptions}
            {...form.getInputProps("skinColor")}
          />

          <Title mt="5px" order={4}>
            {i18n.t("subjects.form.fields.address")}
          </Title>
          <Flex
            w="100%"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_state")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("addressState")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_city")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("addressCity")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_district")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("addressDistrict")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_street")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("addressStreet")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_number")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("addressNumber")}
            />
          </Flex>

          <Select
            mt="5px"
            w="50%"
            label={i18n.t("subjects.form.fields.income")}
            placeholder={i18n.t("subjects.form.pick")}
            data={incomeOptions}
            {...form.getInputProps("income")}
          />

          <Radio.Group
            mt="5px"
            {...form.getInputProps("familyBond")}
            name="family_bond"
            label={i18n.t("subjects.form.fields.family_bond")}
          >
            <Group mt="xs">
              <Radio
                value="active"
                label={i18n.t(
                  "subjects.form.fields.family_bond_options.active"
                )}
              />
              <Radio
                value="fragile"
                label={i18n.t(
                  "subjects.form.fields.family_bond_options.fragile"
                )}
              />
            </Group>
          </Radio.Group>

          <Text fz="0.875rem" mt="5px" mb="5px" c="#212529">
            {i18n.t("subjects.form.fields.chemical_dependency")}
          </Text>

          <Checkbox.Group {...form.getInputProps("chemicalDependency")}>
            {chemicalDependencyOptions.map((chemicalDependency, index) => (
              <Checkbox
                mb="md"
                key={index}
                value={chemicalDependency.value}
                label={chemicalDependency.label}
              ></Checkbox>
            ))}
          </Checkbox.Group>

          {form.values.chemicalDependency.includes("other") ? (
            <TextInput
              w="50%"
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("otherChemicalDependency")}
            />
          ) : (
            ""
          )}

          <TextInput
            mt="5px"
            w="50%"
            label={i18n.t("subjects.form.fields.article_sentence")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("articleSentence")}
          />

          <TextInput
            mt="5px"
            w="50%"
            label={i18n.t("subjects.form.fields.condemnation_status")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("condemnationStatus")}
          />

          <Flex mt="xl" justify="flex-end">
            <Button type="submit">{i18n.t("create")}</Button>
          </Flex>
        </form>
      </Card>
    </AppLayout>
  );
}
