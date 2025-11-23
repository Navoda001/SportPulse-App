import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import store from "./redux/store";
import { loadInitialState } from "./redux/persist";

LogBox.ignoreAllLogs(true); // hide warnings for demo

export default function App() {
  // Load persisted slices on app start
  useEffect(() => {
    store.dispatch(loadInitialState());
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

registerRootComponent(App);
