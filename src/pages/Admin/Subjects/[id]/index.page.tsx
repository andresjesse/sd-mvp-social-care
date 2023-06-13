import React, { useEffect, useState } from "react";
import AppLayout from "@/pages/Layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import useDocument from "@/hooks/useDocument";
import PageSkeleton from "./_PageSkeleton";
import { Button, Card, Flex, MediaQuery, Text, Title } from "@mantine/core";
import { Subject } from "@/types/Subject";
import i18n from "@/lang";
import moment from "moment";
import incomeOptions from "@/helpers/generateIncomeOptions";

const getSx = (val: string | undefined) => {
  return !val
    ? {
        color: "grey",
      }
    : {};
};

export default function AdminSocialServicesShowPage() {
  const navigate = useNavigate();

  const { subjectId } = useParams();
  const { data: subject, loading: loadingSubject } = useDocument<Subject>(
    "subjects",
    subjectId || ""
  );

  const [subjectIconme, setSubjectIconme] = useState<string>();
  const [subjectChemicalDependency, setSubjectChemicalDependency] =
    useState<string>();

  useEffect(() => {
    if (subject) {
      if (subject.income) {
        const incomes = incomeOptions();
        setSubjectIconme(incomes[parseInt(subject.income)]["label"]);
      }

      if (subject.chemicalDependency) {
        const chemicalDependencyTranslated = [];

        subject.chemicalDependency.forEach((chemicalDependency) => {
          if (chemicalDependency != "other") {
            chemicalDependencyTranslated.push(
              i18n.t(
                `subjects_create_page.form.fields.chemical_dependency_options.${chemicalDependency}`
              )
            );
          }
        });

        if (subject.otherChemicalDependency) {
          chemicalDependencyTranslated.push(subject.otherChemicalDependency);
        }

        setSubjectChemicalDependency(chemicalDependencyTranslated.join(", "));
      }
    }
  });

  const showSkeleton = loadingSubject;

  return (
    <AppLayout navbarLinkActive="subjects">
      {showSkeleton || !subject ? (
        <PageSkeleton />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>{i18n.t("subjects_show_page.title")}</Title>

          <Title mt="md" order={2}>
            {i18n.t("subjects_show_page.principal_info")}
          </Title>

          <Flex direction="column" w="100%">
            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.name")}:
              </Text>
              <Text span ml="5px">
                {subject.name}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.relative_name")}:
              </Text>
              <Text span ml="5px">
                {subject.relativeName} (
                {i18n.t(
                  `subjects_create_page.form.fields.relative_relation_options.${subject.relativeRelation}`
                )}
                )
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.birth_date")}:
              </Text>
              <Text span ml="5px">
                {moment(subject.birthDate).format("DD/MM/YYYY")}
              </Text>
            </Text>

            <Title mt="md" order={2}>
              {i18n.t("subjects_create_page.form.aditional_info")}
            </Title>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.cpf")}:
              </Text>
              <Text span ml="5px" sx={getSx(subject.cpf)}>
                {subject.cpf || i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.rg")}:
              </Text>
              <Text span ml="5px" sx={getSx(subject.rg)}>
                {subject.rg || i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.born_place")}:
              </Text>
              <Text span ml="5px">
                {subject.bornPlace || i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.origin_unit")}:
              </Text>
              <Text span ml="5px">
                {subject.originUnit || i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.destination_unit")}:
              </Text>
              <Text span ml="5px">
                {subject.destinationUnit ||
                  i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Title mt="md" order={3}>
              {i18n.t("subjects_create_page.form.fields.familiar_contact")}
            </Title>

            <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
              <Flex mt="md" w="100%">
                <Text mr="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.phone")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.contactPhone ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>

                <Text>
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.address")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.contactAddress ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>
              </Flex>
            </MediaQuery>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.family_bond")}:
              </Text>
              <Text span ml="5px">
                {subject.familyBond
                  ? i18n.t(
                      `subjects_create_page.form.fields.family_bond_options.${subject.familyBond}`
                    )
                  : i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Title mt="md" order={3}>
              {i18n.t("subjects_create_page.form.fields.address")}
            </Title>

            <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>
              <Flex w="100%">
                <Text mt="sm" mr="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.address_state")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.addressState ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>

                <Text mt="sm" mr="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.address_city")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.addressCity ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>

                <Text mt="sm" mr="sm">
                  <Text fw={700} span>
                    {i18n.t(
                      "subjects_create_page.form.fields.address_district"
                    )}
                    :
                  </Text>
                  <Text span ml="5px">
                    {subject.addressDistrict ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>

                <Text mt="sm" mr="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.address_street")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.addressStreet ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>

                <Text mt="sm">
                  <Text fw={700} span>
                    {i18n.t("subjects_create_page.form.fields.address_number")}:
                  </Text>
                  <Text span ml="5px">
                    {subject.addressNumber ||
                      i18n.t("subjects_show_page.empty_info")}
                  </Text>
                </Text>
              </Flex>
            </MediaQuery>

            <Title mt="md" order={3}>
              {i18n.t(
                "subjects_create_page.form.fields.demographic_information"
              )}
            </Title>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.religion")}:
              </Text>
              <Text span ml="5px">
                {subject.religion || i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.skin_color")}:
              </Text>
              <Text span ml="5px">
                {subject.skinColor
                  ? i18n.t(
                      `subjects_create_page.form.fields.skin_color_options.${subject.skinColor}`
                    )
                  : i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.income")}:
              </Text>
              <Text span ml="5px">
                {subjectIconme
                  ? subjectIconme
                  : i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Title mt="md" order={3}>
              {i18n.t("subjects_create_page.form.fields.other")}
            </Title>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.chemical_dependency")}
                :
              </Text>
              <Text span ml="5px">
                {subjectChemicalDependency
                  ? subjectChemicalDependency
                  : i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.article_sentence")}:
              </Text>
              <Text span ml="5px">
                {subject.articleSentence ||
                  i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>

            <Text mt="sm">
              <Text fw={700} span>
                {i18n.t("subjects_create_page.form.fields.condemnation_status")}
                :
              </Text>
              <Text span ml="5px">
                {subject.condemnationStatus ||
                  i18n.t("subjects_show_page.empty_info")}
              </Text>
            </Text>
          </Flex>

          <Flex mt="xl" justify="flex-start">
            <MediaQuery largerThan="sm" styles={{ width: "20%" }}>
              <Button
                w="100%"
                type="button"
                onClick={() => navigate("/admin/subjects")}
              >
                {i18n.t("subjects_show_page.go_back")}
              </Button>
            </MediaQuery>
          </Flex>
        </Card>
      )}
    </AppLayout>
  );
}
