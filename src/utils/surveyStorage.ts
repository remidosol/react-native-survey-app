import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoredSurveyData } from "../types/survey";

export const SURVEY_DATA_STORAGE_KEY = "surveyData";

export const getSurveyData = async (): Promise<StoredSurveyData | null> => {
  try {
    const rawSurveyData = await AsyncStorage.getItem(SURVEY_DATA_STORAGE_KEY);

    if (rawSurveyData) {
      const parsedSurveyData: StoredSurveyData = JSON.parse(rawSurveyData);

      return parsedSurveyData;
    }

    return null;
  } catch (e) {
    console.error("Failed to save Survey data", e);
    return null;
  }
};

export const saveSurveyData = async (data: StoredSurveyData) => {
  try {
    await AsyncStorage.setItem(SURVEY_DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save Survey data", e);
  }
};

export const clearSurveyData = async () => {
  try {
    await AsyncStorage.removeItem(SURVEY_DATA_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear Survey data", e);
  }
};
