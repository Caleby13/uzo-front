import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { InputAddUpdate } from "./pages/inputs/add_update";
import { InputView } from "./pages/inputs/view";
import { Login } from "./pages/login";
import { ProductAddUpdate } from "./pages/products/add_update";
import { ProductView } from "./pages/products/view";
import { UserAddUpdate } from "./pages/users/add_update";
import { UserView } from "./pages/users/view";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="users" element={<UserView />}>
        <Route path=":id" element={<UserAddUpdate />} />
      </Route>
      <Route path="inputs" element={<InputView />}>
        <Route path=":id" element={<InputAddUpdate />} />
      </Route>
      <Route path="products" element={<ProductView />}>
        <Route path=":id" element={<ProductAddUpdate />} />
      </Route>

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
