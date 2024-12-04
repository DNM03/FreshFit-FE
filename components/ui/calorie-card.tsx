import { View, Text } from "react-native";
import React from "react";

type CalorieCardProps = {
  name: string;
  description: string;
  calorie: number;
};

const CalorieCard = ({ name, description, calorie }: CalorieCardProps) => {
  return (
    <View className="flex flex-row justify-between bg-[#E0FBE2] mt-4 p-4 rounded-md">
      <View>
        <Text className="text-[#176219] text-xl font-bold">{name}</Text>
        <Text className="text-[#176219] text-base ">{description}</Text>
      </View>
      <View>
        <Text className="text-[#176219] font-bold text-xl">{calorie} cal</Text>
      </View>
    </View>
  );
};

export default CalorieCard;