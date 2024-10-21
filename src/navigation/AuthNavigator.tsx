import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import KvkkScreen from "../screens/Auth/KvkkScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import { RootState } from "../store";
import { BaseNavigationRouteParam } from "../types/props";
import MainTabNavigator from "./MainTabNavigator";
import { AuthStackScreenProps } from "../types/navigator";
import { useTranslation } from "react-i18next";

export type AuthStackParamList = {
  Login: {
    username?: string | null;
    password?: string | null;
  };
  SignUp: BaseNavigationRouteParam;
  KVKK: BaseNavigationRouteParam;
  MainTabs: BaseNavigationRouteParam;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const { t } = useTranslation();

  const StackArr: AuthStackScreenProps[] = [
    {
      route: "Login",
      label: t("login"),
      component: LoginScreen,
    },
    { route: "SignUp", label: t("sign_up"), component: SignUpScreen },
    { route: "KVKK", label: t("privacy_policy"), component: KvkkScreen },
    { route: "MainTabs", label: t("home"), component: MainTabNavigator },
  ];

  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "MainTabs" : "Login"}
    >
      {StackArr.map((item, idx) => (
        <AuthStack.Screen key={idx} name={item.route} component={item.component} />
      ))}
    </AuthStack.Navigator>
  );
}
