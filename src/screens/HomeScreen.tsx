// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../navigation/AppNavigator";
import GradientBackground from "../components/GradientBackground";
import { commonStyles } from "../styles/commonStyle";
import { useTranslation } from "react-i18next";
import {
  multipleChoiceQuestionsData,
  singleChoiceQuestionsData,
  sliderQuestionsData,
  SurveyQuestionData,
} from "../data";
import { QuestionType } from "../types/survey";
import { getRandomBytes } from "expo-crypto";
import { faker } from "@faker-js/faker";
import { User } from "../types/auth";
import { getUserData } from "../utils/userStorage";
import Button from "../components/Button";

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, "Home">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route?: RouteProp<AppStackParamList, "Home">;
};

const HomeScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [surveyQuestionsData, setSurveyQuestionsData] = useState<SurveyQuestionData<QuestionType>[]>([]);

  const questions = [singleChoiceQuestionsData, sliderQuestionsData, multipleChoiceQuestionsData];

  const [userData, setUserData] = useState<Partial<User> | null>(null);

  const getUserDataFromStorage = async () => {
    const parsedUserData = await getUserData();

    setUserData(parsedUserData?.user ?? null);
  };

  useEffect(() => {
    const qs: SurveyQuestionData<QuestionType>[] = [];
    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * 2) + Math.round(Math.random() * 1);
      qs.push(questions[rand][i]);
    }

    setSurveyQuestionsData(qs);
    getUserDataFromStorage();
  }, []);

  const startSurvey = () => {
    navigation?.navigate("Survey", {
      surveyQuestionsData,
      title: faker.food.fruit().toUpperCase(),
      surveyId: getRandomBytes(16).toString(),
    });
  };

  return (
    <ImageBackground source={require("../../assets/background.png")} style={commonStyles.backgroundImage}>
      <View style={styles.container}>
        <GradientBackground
          style={styles.gradient}
          colors={["rgba(255, 255, 255, 0)", "#fff"]}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 0.55 }}
          opacity={1}
        >
          <View style={styles.gradientContent}>
            <Text style={styles.welcome}>
              {t("hello")} {userData?.username ?? ""}!
            </Text>
            <Button mode='contained' onPress={startSurvey}>
              {t("start_survey")}
            </Button>
          </View>
        </GradientBackground>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradientContent: {
    marginTop: 250,

    justifyContent: "space-between",
    alignItems: "center",
    // alignSelf: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 50,
  },
});

export default HomeScreen;
