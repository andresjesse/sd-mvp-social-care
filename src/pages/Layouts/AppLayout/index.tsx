import React, { ReactNode } from "react";
import { useState } from "react";
import {
  Navbar,
  AppShell,
  Header,
  Anchor,
  Text,
  Image,
  Group,
  Box,
  useMantineTheme,
  rem,
  MediaQuery,
  Burger,
  Loader,
} from "@mantine/core";

import logo from "@/assets/images/logo-desenho.png";
import {
  faIdCard,
  faUserCircle,
  faSignOut,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "@/lang";
import useAuth from "@/hooks/useAuth";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return <Loader variant="dots" />;

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="md"
      navbar={
        <Navbar
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ base: 300 }}
          height="auto"
          p="xs"
          style={{
            backgroundColor: "#797993",
          }}
        >
          <Navbar.Section grow>
            <Anchor
              href="#"
              color="white"
              fz="lg"
              underline={false}
              sx={{ "&:hover": { color: "#b9b9b9" } }}
            >
              <Text ml="sm" mb="sm">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ marginRight: "15px" }}
                />
                {i18n.t("layout.navbar.home")}
              </Text>
            </Anchor>

            <Anchor
              href="#"
              color="white"
              fz="lg"
              underline={false}
              sx={{ "&:hover": { color: "#b9b9b9" } }}
            >
              <Text ml="sm" mb="sm">
                <FontAwesomeIcon
                  icon={faIdCard}
                  style={{ marginRight: "15px" }}
                />
                {i18n.t("layout.navbar.subjects")}
              </Text>
            </Anchor>
          </Navbar.Section>

          <Navbar.Section>
            <Box
              sx={{
                paddingRight: "35px",
                paddingLeft: "10px",
                paddingTop: theme.spacing.sm,
                borderTop: `${rem(1)} solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
                }`,
              }}
            >
              <Group>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "30px", color: "white" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Text color="white" size="xs">
                    {user?.email}
                  </Text>

                  <Anchor
                    href="#"
                    color="white"
                    fz="sm"
                    underline={false}
                    sx={{ "&:hover": { color: "#b9b9b9" } }}
                  >
                    <FontAwesomeIcon
                      style={{
                        fontSize: "12px",
                        marginRight: "5px",
                        marginTop: "10px",
                      }}
                      icon={faSignOut}
                    />
                    Sair
                  </Anchor>
                </Box>
              </Group>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={65}
          px="md"
          style={{
            backgroundColor: "#797993",
            paddingTop: "0px !important",
            paddingBottom: "0px !important",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image maw={63} src={logo} alt="logo" w="63" />

            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="white"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
