import { View, Text, ScrollView } from "react-native";
import React from "react";
import PlanCard from "~/components/ui/plan-card";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";

const Challenges = () => {
  const challenges = [
    {
      name: "Challenge for beginners",
      type: "Strength",
      level: "Beginner",
      length: "4 weeks",
      isChallenge: true,
    },
    {
      name: "Challenge for intermediate",
      type: "Bodyweight",
      level: "Intermediate",
      length: "5 weeks",
      isChallenge: true,
    },
  ];
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <Text className="text-[#176219] text-5xl font-semibold">Challenges</Text>
      <View className="flex flex-row">
        <FormInput placeholder="Search..." className="w-2/3 mr-2" />
        <Button className="bg-[#176219]">
          <Text className="text-[#E0FBE2]">Recommend</Text>
        </Button>
      </View>
      <View>
        {challenges.map((plan, index) => (
          <PlanCard
            key={index}
            name={plan.name}
            type={plan.type}
            length={plan.length}
            level={plan.level}
            isChallenge={plan.isChallenge}
            onPress={() => {
              // router.navigate("/home/exercise-plan/exercises-plan-detail");
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Challenges;
