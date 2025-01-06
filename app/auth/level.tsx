import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

const Level = () => {
  const router = useRouter();
  const levels = [
    {
      name: "Beginner",
      description:
        "For newcomers, focusing on basics, gradual progression, and building confidence.",
    },
    {
      name: "Intermediate",
      description:
        "For those with some experience, emphasizing skill refinement and moderate challenges.",
    },
    {
      name: "Advanced",
      description:
        "For experienced individuals, focusing on mastery, high intensity, and peak performance.",
    },
  ];
  const [selectedGoal, setSelectedGoal] = React.useState(-1);
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Text className="text-[#176219] text-4xl font-bold mb-8">Level?</Text>
      <View>
        {levels.map((goal, index) => (
          <Pressable key={index} onPress={() => setSelectedGoal(index)}>
            <View
              className="p-2 px-8 bg-white rounded-md mb-4"
              style={{
                borderWidth: selectedGoal === index ? 1 : undefined,
                borderColor: selectedGoal === index ? "#176219" : undefined,
                backgroundColor: selectedGoal === index ? "#176219" : "white",
              }}
            >
              <Text
                className="text-[#176219] text-xl font-semibold"
                style={{
                  color: selectedGoal === index ? "white" : "#176219",
                }}
              >
                {goal.name}
              </Text>
              <Text
                className="text-[#176219] text-lg"
                style={{
                  color: selectedGoal === index ? "white" : "#176219",
                }}
              >
                {goal.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Button
        className="bg-[#176219]  mx-10 mt-4  w-[200px]"
        size="lg"
        onPress={() => {
          if (selectedGoal === -1) {
            alert("Please select a level");
          } else {
            router.push({
              pathname: "/auth/gender",
              params: {
                goal: selectedGoal,
              },
            });
          }
        }}
      >
        <Text className="text-[#E0FBE2]">Next</Text>
      </Button>
      <View className="px-8 w-full mt-8">
        <Progress value={0} max={5} className="text-[#176219]" />
      </View>
    </View>
  );
};

export default Level;
