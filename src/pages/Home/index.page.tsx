import React from "react";
// import { Button } from "@mantine/core";
import { I18n } from "i18n-js";
import translations from "../../lang/translations/pt-BR.json";

export default function Home() {
  const i18n = new I18n(translations);
  i18n.locale = "pt-BR";

  return <div>teste i18n {i18n.t("subject.name")}</div>;

  // return (
  //   <div>
  //     index.page
  //     <Button>Settings</Button>
  //   </div>
  // );
}
