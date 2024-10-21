import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import RippleAnimatedSvg from "../../components/Animated/AnimatedSurveyCompleted";
import SurveyHeader from "../../components/Survey/SurveyHeader";
import SurveyQuestion from "../../components/Survey/SurveyQuestion";
import { LANGUAGE_STORAGE_KEY } from "../../i18n";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { CommonSliderSvgAnimatedProps } from "../../types/props";
import { formatTime } from "../../utils/functions";
import useSaveSurveyData from "../../hooks/useSaveSurveyData";
import { SurveyAnswer } from "../../types/survey";
import { useAppSelector } from "../../store";

type SurveyScreenNavigationProp = StackNavigationProp<AppStackParamList, "Survey">;

type Props = {
  navigation: SurveyScreenNavigationProp;
  route: RouteProp<AppStackParamList, "Survey">;
};

const SurveyScreen = ({ navigation, route }: Props) => {
  const { t, i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(900); // 30 minutes in seconds
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(1 / 10);
  const [language, setLanguage] = useState<"en" | "tr">("tr");
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[]>([]);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);

  const surveyQuestionsData = route.params.surveyQuestionsData;

  useSaveSurveyData({
    surveyId: route?.params.surveyId ?? "",
    title: route?.params.title ?? "",
    surveyAnswers,
    isSurveyCompleted,
    userId: route?.params.userId ?? userId ?? 1,
    currentQuestionIndex: questionIndex,
  });

  const handleAnswer = (id: string, answer: SurveyAnswer) => {
    console.log(`Answer received for question ${id}:`, answer);

    setSurveyAnswers((prevAnswers) => [
      ...prevAnswers.filter((ans) => ans.questionId !== id),
      { questionId: id, answer: answer.answer, questionType: answer.questionType, lastAnswerDate: new Date() },
    ]);
  };

  const handleNextQuestion = () => {
    if (questionIndex < surveyQuestionsData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setProgress((questionIndex + 2) / surveyQuestionsData.length);
    } else {
      finishSurvey();
    }

    console.log("Question has been answered at:", formatTime(timeLeft));
  };

  const finishSurvey = () => {
    console.log("The survey has been finished at:", formatTime(timeLeft));
    setIsSurveyCompleted(true);
    setQuestionIndex(questionIndex + 1);
    navigation?.navigate("SurveyDetail", {});
  };

  const handleHomePress = () => {
    navigation?.navigate("Home", {});
  };

  const getAndSetLanguage = async () => {
    const lang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (lang && lang !== language) {
      setLanguage(lang as "en" | "tr");
    }
  };

  const animatedSvg: React.FC<CommonSliderSvgAnimatedProps> | undefined =
    surveyQuestionsData[questionIndex].svgComponent;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getAndSetLanguage();
  }, []);

  return (
    <View style={styles.container}>
      <SurveyHeader
        title={route?.params.title ?? ""}
        timeLeft={timeLeft}
        totalTime={1800}
        progress={progress}
        onHomePress={handleHomePress}
      />

      <View style={styles.content}>
        {surveyQuestionsData.length > 0 ? (
          <SurveyQuestion
            key={surveyQuestionsData[questionIndex].id}
            questionType={surveyQuestionsData[questionIndex].questionType}
            questionText={surveyQuestionsData[questionIndex].questionText[i18n.language as "en" | "tr"]}
            options={surveyQuestionsData[questionIndex].options?.[i18n.language as "en" | "tr"]}
            onAnswer={(answer) => handleAnswer(surveyQuestionsData[questionIndex].id, answer)}
            AnimatedSvgComponent={animatedSvg}
          />
        ) : questionIndex >= surveyQuestionsData.length ? (
          <>
            <RippleAnimatedSvg />
            <Text style={styles.title}>{t("survey_completed")}</Text>
            <Text style={styles.subtitle}>{t("data_saved")}</Text>
          </>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => setQuestionIndex(questionIndex - 1)}>
          <Ionicons name='arrow-back' size={24} color='#6C63FF' />
        </TouchableOpacity>

        <Button
          mode='contained'
          onPress={handleNextQuestion}
          style={styles.nextButton}
          labelStyle={styles.nextButtonLabel}
        >
          {questionIndex < surveyQuestionsData.length - 1 ? t("next_question") : t("complete_survey")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: "#F1F1F1",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#0300A3",
    paddingVertical: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  nextButtonLabel: {
    fontSize: 16,
    color: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
});

export default SurveyScreen;
