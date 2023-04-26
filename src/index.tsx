import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import theme from "./config/theme";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pt-br";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <DatesProvider settings={{ locale: "pt-br" }}>
        <Notifications />
        <App />
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>
);
