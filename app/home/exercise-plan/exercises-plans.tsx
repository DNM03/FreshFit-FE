import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import PlanCard from "~/components/ui/plan-card";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const ExercisesPlans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState([
    {
      name: "Strength for beginners",
      type: "Strength",
      level: "Beginner",
      length: "4 weeks",
      onProgress: false,
    },
    {
      name: "Bodyweight for beginners",
      type: "Bodyweight",
      level: "Beginner",
      length: "5 weeks",
      onProgress: true,
    },
  ]);
  const recommends = [
    {
      name: "Burn-out for beginners",
      type: "Bodyweight",
      level: "Beginner",
      length: "5 weeks",
      onProgress: false,
    },
  ];
  const [exercisePlans, setExercisePlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {};
  }, []);
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Plans
        </Text>
        <Picker
          onValueChange={(value) => console.log(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
            width: 150,
          }}
        >
          <Picker.Item
            label="System"
            value="system"
            style={{ color: "#176219" }}
          />
          <Picker.Item label="Me" value="me" style={{ color: "#176219" }} />
        </Picker>
      </View>
      <View className="flex flex-col ">
        <FormInput placeholder="Search..." className="w-full" />
        <Button
          onPress={() => {
            setPlans((prev) => [...prev, ...recommends]);
          }}
          className="bg-[#176219] mx-24"
        >
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
            onProgress={plan.onProgress}
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
