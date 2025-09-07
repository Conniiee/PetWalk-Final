import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import OwnerHome from "../screens/OwnerHome";
import WalkerDetails from "../screens/WalkerDetails";
import WalkerHome from "../screens/WalkerHome";
import { useUserStore } from "../store/userStore";

// Define your stack param list
export type RootStackParamList = {
  Auth: undefined;
  OwnerHome: undefined;
  WalkerDetails: { walkerId: string; onConfirm?: (booking: any) => void };
  WalkerHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const role = useUserStore((s) => s.role);

  return (
    <Stack.Navigator>
      {!role && (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
      {role === "owner" && (
        <Stack.Screen
          name="OwnerHome"
          component={OwnerHome}
          options={{ title: "Find Walkers" }}
        />
      )}
      {role === "owner" && (
        <Stack.Screen
          name="WalkerDetails"
          component={WalkerDetails}
          options={{ title: "Walker" }}
        />
      )}
      {role === "walker" && (
        <Stack.Screen
          name="WalkerHome"
          component={WalkerHome}
          options={{ title: "Jobs" }}
        />
      )}
    </Stack.Navigator>
  );
}
