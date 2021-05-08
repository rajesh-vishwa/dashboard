import React from "react";
import { useApp } from "./context/app-context";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  const { user } = useApp();

  return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default App;
