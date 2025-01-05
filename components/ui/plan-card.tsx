import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";

type PlanCardProps = {
  name: string;
  type: string;
  length: string;
  onProgress: boolean;
  onPress?: () => void;
  estimated_calories_burned: number;
};

const PlanCard = ({
  name,
  length,
  type,
  onProgress,
  onPress,
  estimated_calories_burned,
}: PlanCardProps) => {
  return (
    <ImageBackground
      source={require("~/assets/images/workout.jpg")}
      resizeMode="cover"
      style={{ flex: 1, borderRadius: 8, overflow: "hidden" }}
      className="mt-4 relative"
    >
      <Pressable onPress={onPress}>
        <View className="flex flex-row justify-between mt-4 p-4 rounded-md pt-32">
          <View>
            <Text className="text-white text-xl font-bold">{name}</Text>
            <Text className="text-white">
              {length} days - {type}
            </Text>
            <Text className="text-white">
              Estimated calories burned: {estimated_calories_burned}
            </Text>
          </View>
          {onProgress && (
            <Text className="text-red-600 font-bold absolute right-2">
              {onProgress}
            </Text>
          )}
        </View>
      </Pressable>
    </ImageBackground>
  );
};

export default PlanCard;
