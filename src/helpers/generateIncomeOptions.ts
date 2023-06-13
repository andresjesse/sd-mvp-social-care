import { SelectItem } from "@mantine/core";
import i18n from "../lang";

export default function generateIconmeOptions(): SelectItem[] {
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

  return incomeOptions;
}
