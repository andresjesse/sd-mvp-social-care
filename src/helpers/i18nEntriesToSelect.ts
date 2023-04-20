import i18n from "@/lang";
import { SelectItem } from "@mantine/core";

export default function i18nEntriesToSelect(
  scopeRoot: string
): (string | SelectItem)[] {
  return Object.entries(i18n.t(scopeRoot)).map((entry) => ({
    value: entry[0],
    label: entry[1],
  }));
}
