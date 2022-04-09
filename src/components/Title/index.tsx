import React, { ReactNode } from "react";

interface ITitle {
  children: ReactNode;
}

export const Title = ({ children }: ITitle) => {
  return (
    <div
      style={{ textAlign: "center", color: "#1976D2", fontFamily: "Roboto" }}
    >
      <h1>{children}</h1>
    </div>
  );
};
