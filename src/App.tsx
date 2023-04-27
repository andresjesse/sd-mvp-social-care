import React from "react";
import firebaseConfig from "@/config/firebaseConfig";
import useFirebase from "@/hooks/useFirebase";
import Router from "@/router";
import AppLoader from "./pages/Layouts/AppLoader";

function App() {
  const app = useFirebase(firebaseConfig);

  if (!app) return <AppLoader />;

  return <Router />;
}

export default App;
