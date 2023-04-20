import React from "react";
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
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { hasLength, useForm } from "@mantine/form";
import i18nEntriesToSelect from "@/helpers/i18nEntriesToSelect";
import type { Subject } from "@/types/Subject";

export default function AdminSubjectsCreatePage() {
  const relativeRelationOptions = i18nEntriesToSelect(
    "subjects.form.fields.relative_relation_options"
  );

  const colorOptions = i18nEntriesToSelect(
    "subjects.form.fields.skin_color_options"
  );

  // Classe A: 2,8% (renda mensal domiciliar superior a R$ 22 mil)
  // Classe B: 13,2% (renda mensal domiciliar entre R$ 7,1 mil e R$ 22 mil)
  // Classe C: 33,3% (renda mensal domiciliar entre R$ 2,9 mil e R$ 7,1 mil)
  // Classes D/E: 50,7% (renda mensal domiciliar até R$ 2,9 mil)
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

  const form = useForm<Subject>({
    initialValues: {
      name: "",
      relativeName: "",
      relativeRelation: "parents",
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
      articleSentence: "",
      condemnationStatus: "",
    },

    validate: {
      name: hasLength({ min: 1 }),
      relativeName: hasLength({ min: 1 }),
    },
  });

  let hasChemicalDependencyOtherOption = false;
  const setChemicalDependencyChecked = async (
    checked: boolean,
    fieldName: string
  ) => {
    if (fieldName == "other") {
      hasChemicalDependencyOtherOption = checked;
    }

    // if (checked) {
    //   form.values.chemical_dependency.push(fieldName);
    // } else {
    //   const index = form.values.chemical_dependency.indexOf(fieldName);
    //   form.values.chemical_dependency.splice(index, 1);
    // }

    console.log("is", form.values.chemicalDependency, checked, fieldName);
  };

  const handleCreate = async (subject: Subject) => {
    console.log("form");
    console.log(subject);
  };

  return (
    <AppLayout navbarLinkActive="home">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>{i18n.t("subjects.form.create")}</Title>

        <form onSubmit={form.onSubmit((values) => handleCreate(values))}>
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
              return new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            label={i18n.t("subjects.form.fields.birth_date")}
            placeholder="00/00/0000"
            {...form.getInputProps("birth_date")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.cpf")}
            placeholder="000.000.000-00"
            {...form.getInputProps("cpf")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.rg")}
            placeholder="000.000.000-00"
            {...form.getInputProps("rg")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.born_place")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("born_place")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.origin_unit")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("origin_unit")}
          />

          <TextInput
            w="50%"
            mt="5px"
            label={i18n.t("subjects.form.fields.destination_unit")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("destination_unit")}
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
              {...form.getInputProps("contact_phone")}
            />

            <TextInput
              w="40%"
              label={i18n.t("subjects.form.fields.address")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("contact_address")}
            />
          </Flex>

          <DateInput
            maxDate={new Date()}
            w="50%"
            mt="5px"
            withAsterisk
            dateParser={(input: string) => {
              return new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            label={i18n.t("subjects.form.fields.last_social_service_date")}
            placeholder="00/00/0000"
            {...form.getInputProps("last_social_service_date")}
          />

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
            {...form.getInputProps("color")}
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
              {...form.getInputProps("address_state")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_city")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("address_city")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_district")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("address_district")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_street")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("address_street")}
            />

            <TextInput
              w="30%"
              label={i18n.t("subjects.form.fields.address_number")}
              placeholder={i18n.t("subjects.form.example")}
              {...form.getInputProps("address_number")}
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
            {...form.getInputProps("family_bond")}
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
          <Flex
            w="100%"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Checkbox
              w="20%"
              name="alcohol"
              label={i18n.t(
                "subjects.form.fields.chemical_dependency_options.alcohol"
              )}
              onChange={(event) =>
                setChemicalDependencyChecked(
                  event.currentTarget.checked,
                  event.currentTarget.name
                )
              }
            />

            <Checkbox
              w="20%"
              name="crack"
              label={i18n.t(
                "subjects.form.fields.chemical_dependency_options.crack"
              )}
              onChange={(event) =>
                setChemicalDependencyChecked(
                  event.currentTarget.checked,
                  event.currentTarget.name
                )
              }
            />

            <Checkbox
              w="20%"
              name="cocaine"
              label={i18n.t(
                "subjects.form.fields.chemical_dependency_options.cocaine"
              )}
              onChange={(event) =>
                setChemicalDependencyChecked(
                  event.currentTarget.checked,
                  event.currentTarget.name
                )
              }
            />

            <Checkbox
              w="20%"
              name="marihuana"
              label={i18n.t(
                "subjects.form.fields.chemical_dependency_options.marihuana"
              )}
              onChange={(event) =>
                setChemicalDependencyChecked(
                  event.currentTarget.checked,
                  event.currentTarget.name
                )
              }
            />

            <Flex
              w="100%"
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Checkbox
                w="20%"
                name="other"
                label={i18n.t(
                  "subjects.form.fields.chemical_dependency_options.other"
                )}
                onChange={(event) =>
                  setChemicalDependencyChecked(
                    event.currentTarget.checked,
                    event.currentTarget.name
                  )
                }
              />

              <TextInput
                sx={() => ({
                  display: hasChemicalDependencyOtherOption ? "block" : "none",
                })}
                w="30%"
                placeholder={i18n.t("subjects.form.example")}
                onChange={(event) =>
                  setChemicalDependencyChecked(true, event.currentTarget.name)
                }
              />
            </Flex>
          </Flex>

          <TextInput
            mt="5px"
            w="50%"
            label={i18n.t("subjects.form.fields.article_sentence")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("article_sentence")}
          />

          <TextInput
            mt="5px"
            w="50%"
            label={i18n.t("subjects.form.fields.condemnation_status")}
            placeholder={i18n.t("subjects.form.example")}
            {...form.getInputProps("condemnation_status")}
          />

          <Flex mt="xl" justify="flex-end">
            <Button type="submit">{i18n.t("create")}</Button>
          </Flex>
        </form>
      </Card>
    </AppLayout>
  );
}
