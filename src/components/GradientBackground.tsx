import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  opacity?: number;
  borderRadius?: number;
  children: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  opacity = 1,
  borderRadius = 0,
  children,
}) => {
  return (
    <LinearGradient colors={colors} start={start} end={end} style={[styles.gradient, style, { opacity, borderRadius }]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
