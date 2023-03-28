import React from "react";
import firebaseConfig from "./config/firebaseConfig";
import useFirebase from "./hooks/useFirebase";
import Router from "./router";

function App() {
  const app = useFirebase(firebaseConfig);

  if (!app) return <div>Loading</div>;

  return <Router />;
}

export default App;
