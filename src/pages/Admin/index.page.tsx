import React from "react";
import AppLayout from "../Layouts/AppLayout";
import i18n from "@/lang";

export default function Admin() {
  return (
    <AppLayout>
      <div>{i18n.t("hello")}</div>
    </AppLayout>
  );
}
