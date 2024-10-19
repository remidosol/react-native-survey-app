import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import BottomSheet from "../../components/BottomSheet";
import CarouselIndicator from "../../components/CarouselIndicator";
import { AuthStackParamList } from "../../navigation/AuthNavigator";
import { commonStyles } from "../../styles/commonStyle";
import { saveKvkkState } from "../../utils/kvkkStorage";
import Button from "../../components/Button";
import CustomBottomSheet from "../../components/BottomSheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";

type KvkkScreenNavigationProp = StackNavigationProp<AuthStackParamList, "KVKK">;

type Props = {
  navigation?: KvkkScreenNavigationProp;
  route?: RouteProp<AuthStackParamList, "KVKK">;
};

const KvkkScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);

  const handleKvkkAcceptance = async () => {
    await saveKvkkState(accepted);
    if (accepted) {
      navigation?.navigate("MainTabs", { userId: route?.params.userId, token: route?.params.token });
    }
  };

  return (
    <ImageBackground source={require("../../../assets/background.png")} style={commonStyles.backgroundImage}>
      <CustomBottomSheet>
        <BottomSheetView>
          <Text style={styles.title}>{t("about_sensitive_data")}</Text>

          <Text style={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
          </Text>

          <View style={styles.switchContainer}>
            <Switch value={accepted} onValueChange={setAccepted} />
            <Text style={styles.switchLabel}>{t("i_accept")}</Text>
          </View>

          <Button mode='contained' onPress={handleKvkkAcceptance} style={styles.button} disabled={!accepted}>
            {t("next")}
          </Button>
          <CarouselIndicator step={2} totalSteps={2} />
        </BottomSheetView>
      </CustomBottomSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0000FF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  switchLabel: {
    marginLeft: 10,
  },
});

export default KvkkScreen;
