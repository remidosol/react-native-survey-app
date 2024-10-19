import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoredUserData } from "../types/auth";

export const USER_DATA_STORAGE_KEY = "userData";

export const getUserData = async (): Promise<StoredUserData | null> => {
  try {
    const rawSurveyData = await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);

    if (rawSurveyData) {
      const parsedSurveyData: StoredUserData = JSON.parse(rawSurveyData);

      return parsedSurveyData;
    }

    return null;
  } catch (e) {
    console.error("Failed to save Survey data", e);
    return null;
  }
};

export const saveUserData = async (data: StoredUserData) => {
  try {
    await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save User data", e);
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear User data", e);
  }
};
