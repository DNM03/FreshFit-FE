import { View, Text } from "react-native";
import React from "react";

type MealCardProps = {
  type: string;
  calorie: number;
};

const MealCard = ({ type, calorie }: MealCardProps) => {
  return (
    <View>
      <Text>{type}</Text>
      <Text>{calorie} cal</Text>
    </View>
  );
};

export default MealCard;
