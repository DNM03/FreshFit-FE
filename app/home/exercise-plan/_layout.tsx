import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="exercises-plans"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="exercises-plan-detail" options={{ headerShown: false }} />
      {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
