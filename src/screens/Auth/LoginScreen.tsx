import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import InAppNotification from "../../components/Animated/AnimatedInAppNotification";
import Button from "../../components/Button";
import CarouselIndicator from "../../components/CarouselIndicator";
import TextInput from "../../components/TextInput";
import TextInputIcon from "../../components/TextInputIcon";
import useSaveUserData from "../../hooks/useUserData";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { AppDispatch, getUser, login } from "../../store";
import { commonStyles } from "../../styles/commonStyle";
import { User } from "../../types/auth";
import { isKvkkAccepted } from "../../utils/kvkkStorage";
import CustomBottomSheet from "../../components/BottomSheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";

type SurveyScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

type Props = {
  navigation?: SurveyScreenNavigationProp;
  route?: RouteProp<AuthStackParamList, "Login">;
};

const LoginScreen = ({ navigation, route: _route }: Props) => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<number | null>(null); // 1
  const [username, setUsername] = useState(""); // johnd
  const [password, setPassword] = useState(""); // m38rmF$
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("eye");
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  // console.log(username);
  // console.log(password);
  // console.log(isLoading);

  useSaveUserData({ user: userData ?? undefined });

  const loginAndSetToken = async () => {
    const result = await dispatch(login({ username, password }));

    if (login.pending.match(result)) {
      setIsLoading(true);
    } else if (login.fulfilled.match(result)) {
      setIsLoading(false);
      console.log(result);
      return result.payload.token;
    } else if (login.rejected.match(result)) {
      setIsLoading(false);
      if (result.error.code === "ERR_BAD_REQUEST") {
        setErrMessage(t("login_error"));
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }
      // console.error("Error logging in:", result.error.message);
    }
  };

  const handleLogin = async () => {
    const token = await loginAndSetToken();

    if (!token) {
      //
      return;
    }

    const result = await dispatch(getUser(1));

    if (getUser.pending.match(result)) {
      setIsLoading(true);
    } else if (getUser.fulfilled.match(result)) {
      setIsLoading(false);
      console.log(result);
      setUserData(result.payload);
      setUserId(1);
    } else if (getUser.rejected.match(result)) {
      setIsLoading(false);
      setErrMessage(t("login_error"));
      // console.error("Error logging in:", result.error.message);
    }

    const isKvkkAlreadyAccepted = await isKvkkAccepted();

    console.log(isKvkkAlreadyAccepted);

    if (!isKvkkAlreadyAccepted) {
      navigation?.push("KVKK", { userId: userId ?? 1, token });
    }

    navigation?.push("MainTabs", { userId: userId ?? 1, token });
  };

  return (
    <ImageBackground source={require("../../../assets/background.png")} style={commonStyles.backgroundImage}>
      <InAppNotification message={errMessage} type='error' show={showNotification} />
      <CustomBottomSheet>
        <BottomSheetView>
          <Text style={styles.welcome}>{t("welcome")}</Text>
          <TextInput
            label='nickname'
            placeholder='nickname'
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label='password'
            placeholder='password'
            secureTextEntry={secureTextEntry}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            right={
              <TextInputIcon
                icon={passwordIcon}
                onPress={(e) => {
                  e.preventDefault();
                  setSecureTextEntry(!secureTextEntry);
                  setPasswordIcon("eye-off");
                }}
              />
            }
          />
          <Button mode='contained' onPress={handleLogin} style={styles.button} loading={isLoading}>
            {t("login")}
          </Button>
          <TouchableOpacity onPress={() => navigation?.navigate("SignUp", {})}>
            <Text style={styles.signUpText}>{t("signup_if_have_not_account")}</Text>
          </TouchableOpacity>
          <CarouselIndicator step={1} totalSteps={2} />
        </BottomSheetView>
      </CustomBottomSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#0300A3",
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcome: {
    // fontFamily: "Comfortaa",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
  },
  signUpText: {
    marginTop: 20,
    textAlign: "center",
    color: "#0000FF",
  },
});

export default LoginScreen;
