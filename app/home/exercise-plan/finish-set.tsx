import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";

const FinishSet = () => {
  return (
    <View className="flex items-center justify-center bg-[#E0FBE2] flex-1">
      <Text className="text-4xl font-bold text-[#176219] text-center">
        You did it!
      </Text>

      <View>
        <Image source={require("~/assets/images/cup.png")} />
      </View>

      <Button
        className="bg-[#176219] mx-10 mt-4"
        onPress={() => router.replace("/home/exercise-plan/exercises-plans")}
      >
        <Text className="text-[#E0FBE2]">Go back to plan</Text>
      </Button>
    </View>
  );
};

export default FinishSet;
