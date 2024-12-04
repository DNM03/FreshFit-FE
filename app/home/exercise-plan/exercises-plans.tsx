import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import PlanCard from "~/components/ui/plan-card";
import { useRouter } from "expo-router";

const ExercisesPlans = () => {
  const router = useRouter();
  const plans = [
    {
      name: "Strength for beginners",
      type: "Strength",
      level: "Beginner",
      length: "4 weeks",
      isChallenge: false,
    },
    {
      name: "Bodyweight for beginners",
      type: "Bodyweight",
      level: "Beginner",
      length: "5 weeks",
      isChallenge: true,
    },
  ];
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <Text className="text-[#176219] text-5xl font-semibold">Plans</Text>
      <View className="flex flex-row">
        <FormInput placeholder="Search..." className="w-2/3 mr-2" />
        <Button className="bg-[#176219]">
          <Text className="text-[#E0FBE2]">Recommend</Text>
        </Button>
      </View>
      <View>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            name={plan.name}
            type={plan.type}
            length={plan.length}
            level={plan.level}
            isChallenge={plan.isChallenge}
            onPress={() => {
              router.navigate("/home/exercise-plan/exercises-plan-detail");
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExercisesPlans;
