import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import CreateIngredientForm from "~/features/meal/create-ingredient-form";
import { Button } from "~/components/ui/button";

const CreateIngredient = () => {
  const router = useRouter();
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
            Create Ingredient
          </Text>
        </View>
      </View>
      <View
        style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
        className="m-5"
      >
        <Picker
          onValueChange={(value) => console.log(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
          }}
        >
          <Picker.Item
            label="Custom"
            value="custom"
            style={{ color: "#176219" }}
          />
          <Picker.Item
            label="Intermediate"
            value="Intermediate"
            style={{ color: "#176219" }}
          />
          <Picker.Item
            label="Advanced"
            value="Advanced"
            style={{ color: "#176219" }}
          />
        </Picker>
      </View>
      <Button className="bg-[#176219] mx-24 mb-4">
        <Text className="text-[#E0FBE2]">Scan</Text>
      </Button>
      <ScrollView className="flex-1 px-5">
        <CreateIngredientForm />
      </ScrollView>
    </View>
  );
};

export default CreateIngredient;
