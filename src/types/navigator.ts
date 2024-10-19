import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { MainTabParamList } from "../navigation/MainTabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AuthStackParamList } from "../navigation/AuthNavigator";

export type StackComponentProps<T extends keyof AppStackParamList> = {
  navigation?: StackNavigationProp<AppStackParamList, T>;
  route?: RouteProp<AppStackParamList, T>;
};

export type TabComponentProps<T extends keyof MainTabParamList> = {
  navigation?: BottomTabNavigationProp<MainTabParamList, T>;
  route?: RouteProp<MainTabParamList, T>;
};

export type AppStackScreenProps = {
  route: keyof AppStackParamList;
  label: string;
  component: (props: any) => React.JSX.Element;
  options?: any;
};

export type AuthStackScreenProps = {
  route: keyof AuthStackParamList;
  label: string;
  component: (props: any) => React.JSX.Element;
  options?: any;
};

export type CustomTabProps = {
  route: keyof MainTabParamList;
  label: string;
  icon: string;
  component: (props: any) => React.JSX.Element;
  options?: any;
};
