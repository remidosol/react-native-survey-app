import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SurveyScreen from "../screens/Surveys/SurveyScreen";
import { RootState } from "../store";
import { AppStackScreenProps } from "../types/navigator";
import { BaseNavigationRouteParam } from "../types/props";
import { SurveyScreenRouteParams } from "../types/survey";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

export type AppStackParamList = {
  Auth: BaseNavigationRouteParam;
  MainTabs: BaseNavigationRouteParam;
  Survey: BaseNavigationRouteParam & SurveyScreenRouteParams;
  Home: BaseNavigationRouteParam;
  SurveyDetail: BaseNavigationRouteParam;
  Profile: BaseNavigationRouteParam;
  Login: {
    username?: string | null;
    password?: string | null;
  };
  SignUp: BaseNavigationRouteParam;
  KVKK: BaseNavigationRouteParam;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const { t } = useTranslation();

  const StackArr: AppStackScreenProps[] = [
    {
      route: "Auth",
      label: t("auth"),
      component: AuthNavigator,
      options: { headerShown: false },
    },
    {
      route: "MainTabs",
      label: t("home"),
      component: MainTabNavigator,
      options: { headerShown: false },
    },
    {
      route: "Survey",
      label: t("survey"),
      component: SurveyScreen,
      options: { headerShown: false },
    },
  ];

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "MainTabs" : "Auth"}>
      {StackArr.map((item, idx) => (
        <Stack.Screen key={idx} name={item.route} component={item.component} options={item.options} />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigator;
