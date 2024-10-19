import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Switch, List, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "../i18n";
import { User } from "../types/auth";
import { getUserData } from "../utils/userStorage";

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(i18n.language !== "en-US");

  const onToggleSwitch = async () => {
    const newLanguage = isSwitchOn ? "en" : "tr";
    i18n.changeLanguage(newLanguage);
    setIsSwitchOn(!isSwitchOn);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  };

  const [userData, setUserData] = useState<Partial<User> | null>(null);

  const getUserDataFromStorage = async () => {
    const parsedUserData = await getUserData();

    setUserData(parsedUserData?.user ?? null);
  };

  const loadLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
      setIsSwitchOn(storedLanguage === "tr");
    }
  };

  useEffect(() => {
    loadLanguage();
    getUserDataFromStorage();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t("profile")}</Text>

      <View style={styles.profileSection}>
        <List.Item
          title={t("nickname")}
          description={userData?.username}
          right={(props) => <Ionicons {...props} name='create-outline' size={20} color='#0300A3' />}
        />
        <Divider />
        <List.Item
          title={t("email")}
          description={userData?.email}
          right={(props) => <Ionicons {...props} name='create-outline' size={20} color='#0300A3' />}
        />
        <Divider />
        <List.Item
          title={t("birthday")}
          description={userData?.birthday}
          right={(props) => <Ionicons {...props} name='create-outline' size={20} color='#0300A3' />}
        />
        <Divider />
        <List.Item
          title={t("gender")}
          description={userData?.gender}
          right={(props) => <Ionicons {...props} name='create-outline' size={20} color='#0300A3' />}
        />
        <Divider />
      </View>

      <View style={styles.languageSwitchContainer}>
        <Text style={styles.languageSwitchText}>{t("switch_language")}</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      <View style={styles.aboutSection}>
        <List.Item title={t("privacy_policy")} onPress={() => {}} titleStyle={styles.linkText} />
        <Divider />
        <List.Item title={t("terms_and_conditions")} onPress={() => {}} titleStyle={styles.linkText} />
        <Divider />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0300A3",
    marginBottom: 20,
  },
  profileSection: {
    marginBottom: 20,
  },
  languageSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  languageSwitchText: {
    fontSize: 16,
    color: "#0300A3",
    fontWeight: "600",
  },
  aboutSection: {
    marginTop: 20,
  },
  linkText: {
    color: "#0300A3",
    fontWeight: "600",
  },
});

export default ProfileScreen;
