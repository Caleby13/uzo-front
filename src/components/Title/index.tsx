import React, { ReactNode } from "react";

interface ITitle {
  children: ReactNode;
}

export const Title = ({ children }: ITitle) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{children}</h1>
    </div>
  );
};
