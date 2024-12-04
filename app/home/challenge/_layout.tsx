import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="challenges"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="challenge-detail" options={{ headerShown: false }} />
      {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
