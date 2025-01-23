import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

const CustomInput = ({
  placeholder,
  rules = {},
  secureTextEntry,
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          style={styles.Input}
          secureTextEntry={secureTextEntry}
        />
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  Input: {
    color: "black",
    paddingLeft: 20,
    fontSize: 16,
    width: 365,
  },
});
