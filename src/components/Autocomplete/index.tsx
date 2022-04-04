import * as React from "react";
import TextField from "@mui/material/TextField";
import AutocompleteMaterial from "@mui/material/Autocomplete";
import { Grid } from "../Grid";

interface IAutoComplete {
  color?: "default" | "inherit" | "primary" | "secondary";
  onChange?:
    | ((event: React.SyntheticEvent<Element, Event>, newValue: any) => void)
    | undefined;
  label: string;
  options: any;
  placeholder: string;
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
  value: string;
}

export default function Autocomplete({
  color = "secondary",
  label,
  options,
  onChange,
  xs,
  placeholder,
  value,
}: IAutoComplete) {
  return (
    <Grid type={"item"} xs={xs}>
      <AutocompleteMaterial
        disablePortal
        color={color}
        placeholder={placeholder}
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
}
