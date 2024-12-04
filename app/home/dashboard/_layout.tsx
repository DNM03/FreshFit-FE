import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="calories-take-in" options={{ headerShown: false }} />
      <Stack.Screen name="calories-burned" options={{ headerShown: false }} />
      <Stack.Screen
        name="water"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="bmi" options={{ headerShown: false }} />
      {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
