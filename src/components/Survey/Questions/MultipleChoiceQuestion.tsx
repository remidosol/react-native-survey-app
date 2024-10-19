import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MultipleChoiceQuestionProps {
  questionText: string;
  options: string[];
  onAnswer: (answer: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ questionText, options, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    let updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions);
    onAnswer(updatedOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questionText}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedOptions.includes(option) ? styles.selectedOption : {}]}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  selectedOption: {
    backgroundColor: "#0000FF",
  },
  optionText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MultipleChoiceQuestion;
