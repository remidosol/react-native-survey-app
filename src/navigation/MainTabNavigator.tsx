import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SurveyDetailScreen from "../screens/Surveys/SurveyDetailScreen";
import { CustomTabProps } from "../types/navigator";
import { BaseNavigationRouteParam } from "../types/props";
import { AppStackParamList } from "./AppNavigator";

export type MainTabParamList = {
  Home: BaseNavigationRouteParam;
  SurveyDetail: BaseNavigationRouteParam;
  Profile: BaseNavigationRouteParam;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = {
  navigation?: StackNavigationProp<AppStackParamList, "Home">;
  route?: RouteProp<AppStackParamList, "Home">;
};

const MainTabNavigator = ({ route }: Props) => {
  const { t } = useTranslation();

  const TabArr: CustomTabProps[] = [
    {
      route: "SurveyDetail",
      label: t("survey_detail"),
      icon: "clipboard",
      component: SurveyDetailScreen,
    },
    {
      route: "Home",
      label: t("home"),
      icon: "home",
      component: HomeScreen,
    },
    {
      route: "Profile" as keyof MainTabParamList,
      label: t("profile"),
      icon: "person",
      component: ProfileScreen,
    },
  ];

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName='Home'
        backBehavior='initialRoute'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "SurveyDetail") {
              iconName = "clipboard";
            } else if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const middleButtonStyle = route.name === "Home" ? styles.middleButton : styles.tabButton;

              return (
                <TouchableOpacity
                  key={route.name}
                  accessibilityRole='button'
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={middleButtonStyle}
                >
                  {route.name === "Home" ? (
                    <View style={styles.middleIconContainer}>
                      <Ionicons name='home' size={28} color='#fff' />
                    </View>
                  ) : (
                    <>
                      <Ionicons
                        name={route.name === "SurveyDetail" ? "stats-chart" : "person"}
                        size={24}
                        color={isFocused ? "#ffffff" : "#888888"}
                      />
                      <Text style={isFocused ? styles.focusedText : styles.defaultText}>
                        {route.name === "SurveyDetail" ? t("survey") : t("profile")}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          // <BottomNavigation.Bar
          //   navigationState={state}
          //   safeAreaInsets={insets}
          //   onTabPress={({ route, preventDefault }) => {
          //     const event = navigation.emit({
          //       type: "tabPress",
          //       target: route.key,
          //       canPreventDefault: true,
          //     });

          //     if (event.defaultPrevented) {
          //       preventDefault();
          //     } else {
          //       navigation.dispatch({
          //         ...CommonActions.navigate(route.name, route.params),
          //         target: state.key,
          //       });
          //     }
          //   }}
          //   renderIcon={({ route, focused, color }) => {
          //     const { options } = descriptors[route.key];
          //     if (options.tabBarIcon) {
          //       return options.tabBarIcon({ focused, color, size: 24 });
          //     }

          //     return null;
          //   }}
          //   getLabelText={({ route }) => {
          //     const { options } = descriptors[route.key];

          //     const label =
          //       options.tabBarLabel !== undefined && typeof options.tabBarLabel === "string"
          //         ? options.tabBarLabel
          //         : options.title !== undefined && typeof options.title === "string"
          //           ? options.title
          //           : route.name;

          //     return label;
          //   }}
          // />
        )}
      >
        {TabArr.map((item, idx) => (
          <Tab.Screen
            key={idx}
            name={item.route}
            initialParams={route?.params}
            component={item.component}
            options={{ title: item.label }}
          />
        ))}
      </Tab.Navigator>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#1a1a1a",
    borderRadius: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  tabButton: {
    alignItems: "center",
  },
  middleButton: {
    position: "relative",
    top: -20,
    alignItems: "center",
  },
  middleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0300A3",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    color: "#888888",
    fontSize: 12,
  },
  focusedText: {
    color: "#ffffff",
    fontSize: 12,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainTabNavigator;
