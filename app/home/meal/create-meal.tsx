import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import CreateMealForm from "~/features/meal/create-meal-form";

const CreateMeal = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  return (
    <View className="bg-[#FDFDFD] h-screen flex-1">
      <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-0 top-1/3"
        >
          <ChevronLeft size={32} color="#176219" className="" />
        </Pressable>
        <View className="  ">
          <Text className="text-[#176219] font-semibold text-2xl">
            {params?.isEdit === "true" ? "Meal Detail" : "Create Meal"}
          </Text>
        </View>
      </View>
      <ScrollView className="px-6 mt-4">
        <CreateMealForm
          isEdit={params?.isEdit === "true"}
          mealId={
            Array.isArray(params?.mealId) ? params?.mealId[0] : params?.mealId
          }
        />
      </ScrollView>
    </View>
  );
};

export default CreateMeal;
