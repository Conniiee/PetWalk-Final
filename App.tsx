import "react-native-gesture-handler"; // MUST be first import

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";

// App entry point, sets up navigation and safe area context
export default function App() {
  return (
    // Enables gesture handling for navigation
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Provides safe area insets for devices with notches */}
      <SafeAreaProvider>
        {/* Navigation container manages navigation state */}
        <NavigationContainer>
          {/* Main navigator for the app */}
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
