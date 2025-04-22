import { Tabs } from "expo-router";
import { Dumbbell, Home, Salad, Swords, User } from "lucide-react-native";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ACE1AF",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#176219",
        tabBarInactiveTintColor: "#FDFDFD",
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="exercise-plan"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Dumbbell size={24} color={focused ? "#176219" : "#FDFDFD"} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: "Challenges",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Swords size={24} color={focused ? "#176219" : "#FDFDFD"} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: "Meals",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Salad size={24} color={focused ? "#176219" : "#FDFDFD"} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <User size={24} color={focused ? "#176219" : "#FDFDFD"} />
          ),
        }}
      />
    </Tabs>
  );
}
