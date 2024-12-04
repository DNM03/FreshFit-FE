import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="meals"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="meal-detail" options={{ headerShown: false }} />
      {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
