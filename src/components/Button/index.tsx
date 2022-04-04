import { ReactNode, MouseEventHandler } from "react";
import { Button as ButtonMaterial } from "@material-ui/core";

interface IButton {
  children: ReactNode;
  color?: "default" | "inherit" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  color = "primary",
  onClick,
  variant = "outlined",
  size = "large",
}: IButton) => (
  <div style={{ marginTop: "15px" }}>
    <ButtonMaterial
      size={size}
      fullWidth
      color={color}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </ButtonMaterial>
  </div>
);
