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
      <Stack.Screen name="create-meal" options={{ headerShown: false }} />

      <Stack.Screen name="dishes" options={{ headerShown: false }} />
      <Stack.Screen name="create-dish" options={{ headerShown: false }} />
      <Stack.Screen name="dish-detail" options={{ headerShown: false }} />
      <Stack.Screen name="ingredients" options={{ headerShown: false }} />
      <Stack.Screen name="create-ingredient" options={{ headerShown: false }} />

      {/* <Stack.Screen name="auth/register" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
