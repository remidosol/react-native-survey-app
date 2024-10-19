import React from "react";
import { View } from "react-native";
import SingleChoiceQuestion from "./Questions/SingleChoiceQuestion";
import SliderQuestion from "./Questions/SliderQuestion";
import MultipleChoiceQuestion from "./Questions/MultipleChoiceQuestion";
import { QuestionType } from "../../types/survey";
import { CommonSliderSvgAnimatedProps } from "../../types/props";

interface SurveyQuestionProps {
  questionType: QuestionType;
  questionText: string;
  options?: string[];
  onAnswer: (answer: any) => void;
  AnimatedSvgComponent?: React.FC<CommonSliderSvgAnimatedProps>;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  questionType,
  questionText,
  options,
  onAnswer,
  AnimatedSvgComponent,
}) => {
  return (
    <View>
      {questionType === "single" && options && (
        <SingleChoiceQuestion questionText={questionText} options={options} onAnswer={onAnswer} />
      )}
      {questionType === "slider" && AnimatedSvgComponent && (
        <SliderQuestion questionText={questionText} AnimatedSvgComponent={AnimatedSvgComponent} onAnswer={onAnswer} />
      )}
      {questionType === "multiple" && options && (
        <MultipleChoiceQuestion questionText={questionText} options={options} onAnswer={onAnswer} />
      )}
    </View>
  );
};

export default SurveyQuestion;
