import * as React from "react";
import Link from "@mui/material/Link";
import { Grid } from "../Grid";

interface IButtonLink {
  children?: React.ReactElement;
  xs:
    | boolean
    | 2
    | 1
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | "auto"
    | 11
    | 12
    | undefined;
  onClick?:
    | (React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLSpanElement>)
    | undefined;
}

export const ButtonLink = ({ children, xs, onClick }: IButtonLink) => {
  return (
    <Grid type={"item"} xs={xs}>
      <Link
        component="button"
        width={"100%"}
        height={"100%"}
        justifyItems="center"
        onClick={onClick}
        style={{ margin: " 0 auto" }}
      >
        {children}
      </Link>
    </Grid>
  );
};
