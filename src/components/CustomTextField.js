import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({
  label,
  type,
  placeholder,
  style,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      variant="outlined"
      label={label}
      type={type}
      style={style}
      placeholder={placeholder}
      required
      helperText={errorText}
      error={!!errorText}
      className={className}
    />
  );
};

export default CustomTextField;
