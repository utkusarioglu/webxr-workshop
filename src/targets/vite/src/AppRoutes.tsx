import { Route, Routes } from "react-router-dom";
import { App } from "./App";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        Component={App}
      />
    </Routes>
  );
}

export default AppRoutes;
