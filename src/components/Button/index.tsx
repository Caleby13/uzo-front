import { ReactNode, MouseEventHandler } from "react";
import { Button as ButtonMaterial } from "@material-ui/core";
import { Grid } from "../Grid";

interface IButton {
  children: ReactNode;
  color?: "default" | "inherit" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  xs: false | "auto" | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const Button = ({
  children,
  color = "primary",
  onClick,
  variant = "outlined",
  size = "large",
  xs,
}: IButton) => (
  <Grid type={"item"} xs={xs}>
    <ButtonMaterial
      size={size}
      fullWidth
      color={color}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </ButtonMaterial>
  </Grid>
);
