import { View, Text, ScrollView } from "react-native";
import React from "react";
import PlanCard from "~/components/ui/plan-card";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

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
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Challenges
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
        <Button className="bg-[#176219] mx-24">
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
            estimated_calories_burned={100}
            onProgress={false}
            // isChallenge={plan.isChallenge}
            onPress={() => {
              router.navigate("/home/challenge/challenge-overview");
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Challenges;
