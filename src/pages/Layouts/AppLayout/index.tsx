import React from "react";

import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Divider,
  Flex,
  Header,
  Image,
  MediaQuery,
  Navbar,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ReactNode, useState } from "react";

import useAuth from "@/hooks/useAuth";
import i18n from "@/lang";
import {
  faCircleUser,
  faHome,
  faIdCard,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyles from "./styles";
import AppLoader from "../AppLoader";
import { Link } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
  navbarLinkActive?: string;
}

export default function AppLayout({
  children,
  navbarLinkActive,
}: AppLayoutProps) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const { user, loading, logout } = useAuth();

  if (loading) return <AppLoader />;

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="md"
      header={
        <Header height={65} px="md" pt={0} pb={0}>
          <Flex justify="space-between" align="center" h="100%">
            <Flex align="center">
              <Link to="/admin">
                <Image
                  maw={63}
                  src="/images/logo-black.png"
                  alt="logo"
                  w="63"
                  mr="lg"
                />
              </Link>
              <Title fz={28} className={classes.headerTitle}>
                Social Care
              </Title>
            </Flex>

            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
              />
            </MediaQuery>
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
        >
          <Navbar.Section grow>
            <Anchor
              href="/admin"
              underline={false}
              className={cx(classes.navbarLink, {
                [classes.navbarLinkActive]: navbarLinkActive === "home",
              })}
            >
              <FontAwesomeIcon icon={faHome} />
              {i18n.t("layout.navbar.home")}
            </Anchor>

            <Anchor
              href="/admin/subjects"
              underline={false}
              className={cx(classes.navbarLink, {
                [classes.navbarLinkActive]: navbarLinkActive === "subjects",
              })}
            >
              <FontAwesomeIcon icon={faIdCard} />
              {i18n.t("layout.navbar.subjects")}
            </Anchor>
          </Navbar.Section>

          <Divider />

          <Navbar.Section>
            <Box className={classes.navbarLink}>
              <FontAwesomeIcon icon={faCircleUser} />
              {user?.email}
            </Box>

            <UnstyledButton
              className={classes.navbarLink}
              w="100%"
              onClick={() => logout()}
            >
              <FontAwesomeIcon icon={faSignOut} />
              {i18n.t("layout.navbar.logout")}
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
