import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="user"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
