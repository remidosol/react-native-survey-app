import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { TextInput, TextInputIconProps } from "react-native-paper";

const TextInputIcon = (props: TextInputIconProps) => {
  const { t } = useTranslation();

  return <TextInput.Icon {...props} icon={props.icon} style={props.style ? props.style : styles.input} />;
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

export default TextInputIcon;
