import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";

interface SingleChoiceQuestionProps {
  questionText: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const { width } = Dimensions.get("window");

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ questionText, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const animatedUnderlineWidth = useRef(new Animated.Value(0)).current;
  const animatedOptionY = useRef(options.map(() => new Animated.Value(0))).current;
  const animatedUnderlineX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedOption !== null) {
      Animated.parallel([
        Animated.timing(animatedUnderlineWidth, {
          toValue: width * 0.16,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedUnderlineX, {
          toValue: selectedOption * (width * 0.18),
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOptionY[selectedOption], {
          toValue: 10,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [selectedOption]);

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
    onAnswer(options[index]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questionText}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Animated.View
            key={index}
            style={[
              styles.optionContainer,
              {
                transform: [{ translateY: animatedOptionY[index] }],
                backgroundColor: getOptionColor(index),
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleOptionPress(index)} style={styles.optionButton}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <Animated.View
        style={[
          styles.underline,
          {
            width: animatedUnderlineWidth,
            transform: [{ translateX: animatedUnderlineX }],
            backgroundColor: selectedOption !== null ? getOptionColor(selectedOption) : "transparent",
          },
        ]}
      />
    </View>
  );
};

const getOptionColor = (index: number) => {
  const colors = ["#32CD32", "#7CFC00", "#FFD700", "#FFA500", "#FF4500"];
  return colors[index] || "#f1f1f1";
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionContainer: {
    borderRadius: 10,
    overflow: "hidden",
    width: width * 0.18,
    height: 50,
  },
  optionButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  underline: {
    height: 5,
    width: width * 0.18,
    marginTop: -10,
    borderRadius: 5,
  },
});

export default SingleChoiceQuestion;
