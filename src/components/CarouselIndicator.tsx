import React from "react";
import { View, StyleSheet } from "react-native";

const CarouselIndicator = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <View key={index} style={[styles.dot, { backgroundColor: index === step - 1 ? "blue" : "lightgray" }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CarouselIndicator;
