import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { TextInput as TextInputPaper, TextInputProps } from "react-native-paper";

const TextInput = (props: TextInputProps) => {
  const { t } = useTranslation();

  return (
    <TextInputPaper
      {...props}
      label={props.label && typeof props.label === "string" ? t(props.label) : undefined}
      placeholder={props.placeholder && typeof props.placeholder === "string" ? t(props.placeholder) : undefined}
      style={props.style ? props.style : styles.input}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
  },
});

export default TextInput;
