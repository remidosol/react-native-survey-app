import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Title } from "react-native-paper";
import { CommonSliderSvgAnimatedProps } from "../../../types/props";

interface SliderQuestionProps {
  questionText: string;
  onAnswer: (answer: number) => void;
  AnimatedSvgComponent: React.FC<CommonSliderSvgAnimatedProps>;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({ questionText, onAnswer, AnimatedSvgComponent }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onAnswer(value);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.questionText}>{questionText}</Title>
      <AnimatedSvgComponent sliderValue={sliderValue} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        minimumTrackTintColor='#0000FF'
        maximumTrackTintColor='#d3d3d3'
        thumbTintColor='#0000FF'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  slider: {
    width: "90%",
    marginTop: 20,
  },
});

export default SliderQuestion;
