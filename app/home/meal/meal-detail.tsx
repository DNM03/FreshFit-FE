import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FormInput } from "~/components/ui/form-input";
import CalorieCard from "~/components/ui/calorie-card";
import { Button } from "~/components/ui/button";

const MealDetail = () => {
  const router = useRouter();
  const caloriesData = [
    {
      name: "Saldad",
      description: "1 bowl",
      calories: 100,
    },
    {
      name: "Burger",
      description: "1 piece",
      calories: 200,
    },
    {
      name: "Pizza",
      description: "2 slices",
      calories: 500,
    },
  ];
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full">
        <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
          <Pressable
            onPress={() => router.replace("/home/meal/meals")}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">
              Meal Detail
            </Text>
          </View>
        </View>
        <View className="px-8 w-full mt-4">
          <FormInput placeholder="Search..." className="w-full" />
        </View>
        <Button className="bg-[#176219] mt-6 mx-20">
          <Text className="text-[#4c764f]">Create new</Text>
        </Button>
        <ScrollView className="mt-4 px-4">
          {caloriesData.map((data, index) => (
            <CalorieCard
              key={index}
              name={data.name}
              description={data.description}
              calorie={data.calories}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MealDetail;
