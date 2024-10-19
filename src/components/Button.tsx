import React from "react";
import { StyleSheet } from "react-native";
import { Button as ButtonPaper, ButtonProps } from "react-native-paper";

const Button = (props: ButtonProps) => {
  return (
    <ButtonPaper {...props} style={props.style ? props.style : styles.input}>
      {props.children}
    </ButtonPaper>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0300A3",
  },
});

export default Button;
