// app/_layout.tsx
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!loggedIn) {
        router.replace("/login");
      }
    };
    checkLogin();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
