import React, { ReactElement, ReactNode } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/auth";
import { Home } from "./pages/home";
import { InputAddUpdate } from "./pages/inputs/add_update";
import { InputView } from "./pages/inputs/view";
import { Login } from "./pages/login";
import { ProductAddUpdate } from "./pages/products/add_update";
import { ProductView } from "./pages/products/view";
import { UserAddUpdate } from "./pages/users/add_update";
import { UserView } from "./pages/users/view";

export function AppRoutes() {
  const Private = ({ children }: { children: ReactElement }) => {
    const { authenticated } = useAuth();

    if (!authenticated) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route
          path="/users"
          element={
            <Private>
              <UserView />
            </Private>
          }
        ></Route>
        <Route
          path="/users/:id"
          element={
            <Private>
              <UserAddUpdate />
            </Private>
          }
        />
        <Route
          path="inputs"
          element={
            <Private>
              <InputView />
            </Private>
          }
        ></Route>
        <Route
          path="/inputs/:id"
          element={
            <Private>
              <InputAddUpdate />
            </Private>
          }
        />
        <Route
          path="products"
          element={
            <Private>
              <ProductView />
            </Private>
          }
        ></Route>
        <Route
          path="/products/:id"
          element={
            <Private>
              <ProductAddUpdate />
            </Private>
          }
        />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
}
