import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

export const Loading = () => {
  return (
    <Backdrop style={{ zIndex: 999, color: "#fff" }} open>
      <CircularProgress />
    </Backdrop>
  );
};
