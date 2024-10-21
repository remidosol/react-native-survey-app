import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { User } from "../types/auth";
import { getUser, logout } from "../store/slices";
import { useTranslation } from "react-i18next";
import { clearUserData, getUserData, saveUserData } from "../utils/userStorage";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../navigation/AppNavigator";
import { MainTabParamList } from "../navigation/MainTabNavigator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import useSaveUserData from "../hooks/useUserData";
import InAppNotification from "../components/Animated/AnimatedInAppNotification";
import Button from "../components/Button";

type ProfileScreenNavigationProp = StackNavigationProp<AppStackParamList, "Profile">;

type Props = {
  navigation?: ProfileScreenNavigationProp;
  route?: RouteProp<AppStackParamList, "Profile">;
};

const ProfileScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useSaveUserData({ user: profileData ?? undefined });

  const getProfileData = async (): Promise<void> => {
    const availableProfileData = await getUserData();

    if (!availableProfileData && route?.params.userId) {
      const result = await dispatch(getUser(route?.params.userId));

      if (getUser.pending.match(result)) {
        setIsLoading(true);
      } else if (getUser.fulfilled.match(result)) {
        setIsLoading(false);
        setProfileData(result.payload);
      } else {
        setErrMessage(t("login_error"));
        setIsLoading(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
        console.error("Error fetching user:", result.error.message);
      }
    }

    if (route?.params.userId && availableProfileData?.user?.id !== route?.params.userId) {
      const result = await dispatch(getUser(route.params.userId));

      if (getUser.pending.match(result)) {
        setIsLoading(true);
      } else if (getUser.fulfilled.match(result)) {
        setIsLoading(false);
        setProfileData(result.payload);
      } else {
        setErrMessage(t("login_error"));
        setIsLoading(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
        console.error("Error fetching user:", result.error.message);
      }
    }
  };

  const handleLogout = async (): Promise<void> => {
    dispatch(logout());

    await clearUserData();

    navigation?.navigate("Login", {});
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0300A3' style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (!profileData) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Kullanıcı bilgileri yüklenemedi.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <InAppNotification message={errMessage} type='error' show={showNotification} />
      <View style={styles.headerContainer}>
        <Icon name='person' size={30} color='#0300A3' />
        <Text style={styles.headerTitle}>{t("profile")}</Text>
      </View>
      <Text style={styles.sectionTitle}>{t("account_info")}</Text>
      <View style={styles.infoItem}>
        <View>
          <Text style={styles.infoLabel}>{t("nickname")}</Text>
          <Text style={styles.infoValue}>{profileData.username}</Text>
        </View>
        <TouchableOpacity>
          <Icon name='pencil' size={24} color='#0300A3' />
        </TouchableOpacity>
      </View>
      <View style={styles.infoItem}>
        <View>
          <Text style={styles.infoLabel}>{t("email")}</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
        <TouchableOpacity>
          <Icon name='pencil' size={24} color='#0300A3' />
        </TouchableOpacity>
      </View>
      <View style={styles.infoItem}>
        <View>
          <Text style={styles.infoLabel}>{t("phone_number")}</Text>
          <Text style={styles.infoValue}>{profileData.phone}</Text>
        </View>
        <TouchableOpacity>
          <Icon name='pencil' size={24} color='#0300A3' />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>{t("about_us")}</Text>
      <TouchableOpacity style={styles.linkItem}>
        <Text style={styles.linkLabel}>{t("privacy_policy")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkItem}>
        <Text style={styles.linkLabel}>{t("terms_and_conditions")}</Text>
      </TouchableOpacity>
      <Button style={styles.logoutButton} onPress={handleLogout}>
        {t("logout")}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0300A3",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginTop: 20,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoValue: {
    color: "#000",
  },
  linkItem: {
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkLabel: {
    color: "#0300A3",
    fontWeight: "bold",
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#0300A3",
    color: "#fff",
    fontWeight: 700,
  },
});

export default ProfileScreen;
