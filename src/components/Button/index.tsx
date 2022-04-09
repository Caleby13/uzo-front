import { ReactNode, MouseEventHandler } from "react";
import { Grid } from "../Grid";
import "./style.css";

interface IButton {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
}

export const Button = ({ children, onClick, xs }: IButton) => (
  <Grid type="item" xs={xs}>
    <button id="custom" onClick={onClick}>
      {children}
    </button>
  </Grid>
);
