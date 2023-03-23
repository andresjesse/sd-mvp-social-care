import React from "react";
import firebaseConfig from "./config/firebaseConfig";
import useFirebase from "./hooks/useFirebase";
import Home from "./pages/Home/index.page";

function App() {
  const app = useFirebase(firebaseConfig);

  if (!app) return <div>Loading</div>;

  return <Home></Home>;
}

export default App;
