import { Grid as GridMaterial } from "@material-ui/core";
import { ReactNode } from "react";

interface IGrid {
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  sm?: false | "auto" | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  xs?: false | "auto" | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  type: "container" | "item";
  children: ReactNode;
}

export const Grid = ({
  justifyContent = "space-around",

  spacing = 1,
  xs = "auto",
  type,
  children,
}: IGrid) => {
  if (type === "container") {
    return (
      <GridMaterial container justifyContent={justifyContent} spacing={spacing}>
        {children}
      </GridMaterial>
    );
  }

  if (type === "item") {
    return (
      <GridMaterial item xs={xs}>
        {children}
      </GridMaterial>
    );
  }
  return (
    <GridMaterial item xs={xs}>
      {children}
    </GridMaterial>
  );
};
