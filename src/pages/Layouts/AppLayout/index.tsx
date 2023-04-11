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
  Flex,
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
  const { user, loading, logout } = useAuth();

  if (loading) return <Loader variant="dots" />;

  const linkSx = {
    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background!,
        0.1
      ),
    },
  };

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="md"
      header={
        <Header
          height={65}
          px="md"
          pt={0}
          pb={0}
          style={{
            // backgroundColor: "#797993",
            backgroundColor: theme.fn.variant({
              variant: "filled",
              color: theme.primaryColor,
            }).background,
            // paddingTop: "0px !important",
            // paddingBottom: "0px !important",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          > */}
          <Flex justify="space-between" align="center" h="100%">
            <Image maw={63} src={logo} alt="logo" w="63" />

            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="white"
              />
            </MediaQuery>
            {/* </div> */}
          </Flex>
        </Header>
      }
      navbar={
        <Navbar
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ base: 300 }}
          height="auto"
          p="xs"
          style={{
            backgroundColor: theme.fn.variant({
              variant: "filled",
              color: theme.primaryColor,
            }).background,
          }}
        >
          <Navbar.Section grow>
            <Anchor
              href="#"
              color="white"
              fz="lg"
              underline={false}
              sx={linkSx}
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
              sx={linkSx}
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
                borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
              }}
            >
              <Group>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "30px", color: "white" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Text color="white" size="md">
                    {user?.email}
                  </Text>

                  <Anchor
                    href="#"
                    color="white"
                    fz="lg"
                    underline={false}
                    sx={linkSx}
                    onClick={() => logout()}
                  >
                    <FontAwesomeIcon
                      style={{
                        fontSize: "12px",
                        marginRight: "5px",
                        marginTop: "10px",
                      }}
                      icon={faSignOut}
                    />
                    {i18n.t("layout.navbar.logout")}
                  </Anchor>
                </Box>
              </Group>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
