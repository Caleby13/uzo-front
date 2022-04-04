import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { InputAddUpdate } from "./pages/inputs/add_update";
import { InputView } from "./pages/inputs/view";
import { Login } from "./pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="inputs" element={<InputView />}>
        <Route path=":id" element={<InputAddUpdate />} />
      </Route>

      <Route path="*" element={<div> Not Found</div>} />
    </Routes>
  );
}
