import { NavigationContainer } from "@react-navigation/native";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import LoadingIndicator from "./src/components/LoadingIndicator";
import "./src/i18n";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { store, useAppSelector } from "./src/store";

const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.token);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <NavigationContainer>{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
    </Suspense>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
