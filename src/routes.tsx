import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { InputAddUpdate } from "./pages/inputs/add_update";
import { InputView } from "./pages/inputs/view";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inputsview" element={<InputView />} />
        <Route path="/inputsaddupdate" element={<InputAddUpdate />} />
      </Routes>
    </Router>
  );
}
