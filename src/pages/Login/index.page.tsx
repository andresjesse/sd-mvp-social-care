import React from "react";
import { Button } from "@mantine/core";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  return <Button onClick={() => login("", "")}>Logar</Button>;
}
