import AsyncStorage from "@react-native-async-storage/async-storage";

const KVKK_STORAGE_KEY = "userKvkkAccepted";

export const saveKvkkState = async (accepted: boolean) => {
  try {
    await AsyncStorage.setItem(KVKK_STORAGE_KEY, JSON.stringify(accepted));
  } catch (e) {
    console.error("Failed to save KVKK state", e);
  }
};

export const isKvkkAccepted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KVKK_STORAGE_KEY);
    return value !== null ? JSON.parse(value) : false;
  } catch (e) {
    console.error("Failed to load KVKK state", e);
    return false;
  }
};

export const clearKvkkState = async () => {
  try {
    await AsyncStorage.removeItem(KVKK_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear KVKK state", e);
  }
};
