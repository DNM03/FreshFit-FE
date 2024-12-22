import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { ChevronLeft, Trash } from "lucide-react-native";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";

const Ingredients = () => {
  const router = useRouter();
  const ingredients = [
    { name: "Tomato", calorie: 50 },
    { name: "Cheese", calorie: 50 },
    { name: "Spinash", calorie: 50 },
  ];
  return (
    <View className="bg-[#FDFDFD] h-screen flex-1 ">
      <View className="flex flex-row justify-center items-center w-full pt-2 relative">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-0 top-1/3"
        >
          <ChevronLeft size={32} color="#176219" className="" />
        </Pressable>
        <View className="  ">
          <Text className="text-[#176219] font-semibold text-2xl">
            Ingredients
          </Text>
        </View>
      </View>
      <View className="flex flex-col   p-5">
        <FormInput placeholder="Search..." className="w-full" />
        <Button
          className="bg-[#176219] mx-24"
          onPress={() => router.navigate("/home/meal/create-ingredient")}
        >
          <Text className="text-[#E0FBE2]">Add Ingredient</Text>
        </Button>
      </View>
      <ScrollView className="flex-1">
        {ingredients.map((ingredient, index) => (
          <View
            key={index}
            className="flex flex-row justify-between items-center p-5 bg-[#E0FBE2] m-2 mx-4 rounded-lg"
          >
            <View className="flex flex-col ">
              <Text className="text-[#176219] font-medium text-2xl">
                {ingredient.name}
              </Text>
              <Text className="text-[#176219] font-medium">
                {ingredient.calorie} cal
              </Text>
            </View>
            <Trash size={24} color="red" className="" />
          </View>
        ))}
      </ScrollView>
      <Button className="bg-[#176219] mx-20 mb-4">
        <Text className="text-[#E0FBE2]">Save</Text>
      </Button>
    </View>
  );
};

export default Ingredients;