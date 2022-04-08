import { Grid } from "../Grid";
import { TextField as TextFieldMaterial } from "@material-ui/core";
import { ChangeEventHandler, ReactElement } from "react";

interface ITextField {
  placeHolder?: string;
  defaultValue?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
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
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  required?: boolean;
  disabled?: boolean;
  children?: ReactElement;
}

export const TextField = ({
  placeHolder,
  defaultValue,
  type = "text",
  variant = "standard",
  onChange,
  xs,
  required = false,
  label = "",
  disabled = false,
  children,
}: ITextField) => {
  return (
    <Grid type={"item"} xs={xs}>
      <TextFieldMaterial
        label={label}
        required={required}
        variant={variant}
        fullWidth
        value={defaultValue}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        type={type}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </TextFieldMaterial>
    </Grid>
  );
};
