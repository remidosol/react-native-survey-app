import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import CarouselIndicator from "../../components/CarouselIndicator";
import TextInput from "../../components/TextInput";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { commonStyles } from "../../styles/commonStyle";
import { isKvkkAccepted } from "../../utils/kvkkStorage";
import CustomBottomSheet from "../../components/BottomSheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";

const SignUpScreen = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, "SignUp">>();

  const handleSignUp = async () => {
    const isKvkkAlreadyAccepted = await isKvkkAccepted();
    if (!isKvkkAlreadyAccepted) {
      navigation.push("KVKK", { userId: userId });
    }
  };

  return (
    <ImageBackground source={require("../../../assets/background.png")} style={commonStyles.backgroundImage}>
      <CustomBottomSheet>
        <BottomSheetView>
          <Text style={styles.label}>{t("select_gender")}</Text>

          <TextInput placeholder='email' style={styles.input} value={email} onChangeText={setEmail} />

          <TextInput placeholder='nickname' style={styles.input} value={nickname} onChangeText={setNickname} />

          <TextInput
            placeholder='password'
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput placeholder='birthday' style={styles.input} value={birthDate} onChangeText={setBirthDate} />

          <Button mode='contained' onPress={handleSignUp} style={styles.button}>
            {t("next")}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate("Login", {})}>
            <Text style={styles.loginText}>{t("login_if_have_account")}</Text>
          </TouchableOpacity>
          <CarouselIndicator step={1} totalSteps={2} />
        </BottomSheetView>
      </CustomBottomSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0000FF",
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
    color: "#0000FF",
  },
});

export default SignUpScreen;
