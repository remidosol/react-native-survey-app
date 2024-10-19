import { useEffect } from "react";
import { UseSaveSurveyDataProps } from "../types/props";
import { getUserData } from "../utils/userStorage";
import { getSurveyData, saveSurveyData } from "../utils/surveyStorage";

const useSaveSurveyData = ({
  surveyId,
  surveyAnswers,
  isSurveyCompleted,
  currentQuestionIndex,
  userId,
}: UseSaveSurveyDataProps) => {
  useEffect(() => {
    const saveSurveyProgress = async () => {
      try {
        const userData = await getUserData();

        if (userData) {
          let storedSurveyData = await getSurveyData();

          if (storedSurveyData) {
            storedSurveyData[surveyId] = {
              ...storedSurveyData[surveyId],
              surveyAnswers: surveyAnswers,
              userId: storedSurveyData[surveyId].userId,
              currentQuestionIndex,
              isSurveyCompleted,
            };
          } else {
            storedSurveyData = {};

            storedSurveyData[surveyId] = {
              ...storedSurveyData[surveyId],
              surveyAnswers: surveyAnswers,
              userId,
              currentQuestionIndex,
              isSurveyCompleted,
            };
          }

          await saveSurveyData(storedSurveyData);
          console.log("Survey progress saved successfully");
        }
      } catch (error) {
        console.error("Error saving survey progress", error);
      }
    };

    saveSurveyProgress();
  }, [surveyId, surveyAnswers, currentQuestionIndex]);

  useEffect(() => {
    if (isSurveyCompleted) {
      const saveSurveyProgress = async () => {
        try {
          const userData = await getUserData();

          if (userData) {
            let storedSurveyData = await getSurveyData();

            if (storedSurveyData) {
              storedSurveyData[surveyId] = {
                ...storedSurveyData[surveyId],
                surveyAnswers: surveyAnswers,
                userId: storedSurveyData[surveyId].userId,
                currentQuestionIndex: 10,
                isSurveyCompleted,
              };
            } else {
              storedSurveyData = {};
              storedSurveyData[surveyId] = {
                ...storedSurveyData[surveyId],
                surveyAnswers: surveyAnswers,
                userId: userId,
                currentQuestionIndex: 10,
                isSurveyCompleted,
              };
            }

            await saveSurveyData(storedSurveyData);
            console.log("Survey data saved successfully");
          }
        } catch (error) {
          console.error("Error saving survey data", error);
        }
      };

      saveSurveyProgress();
    }
  }, [isSurveyCompleted, surveyId, surveyAnswers]);
};

export default useSaveSurveyData;
