import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Picker } from "@react-native-picker/picker";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react-native";
import { useRouter } from "expo-router";

const CreateDishForm = () => {
  const router = useRouter();
  const ingredients = [
    { name: "Tomato", calorie: 200 },
    { name: "Carrot", calorie: 300 },
    { name: "Potato", calorie: 500 },
  ];
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, Beefsteak" label="Name" />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, 1 cup of rice" />
        </View>
        <FormInput placeholder="Eg, 200" label="Calories (cal)" />
        <FormInput placeholder="Eg, 60" label="Preparation time (minutes)" />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Image</Label>

          <View
            className="p-4 mt-4"
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#176219",
              height: 200,
            }}
          ></View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Instructions</Label>
          <Textarea placeholder="Eg, 1 cup of rice" />
        </View>

        <View className="flex-1">
          <View className="flex flex-row items-center justify-start">
            <View>
              <Text className="text-[#176219] font-medium">Ingredients</Text>
            </View>
            <Button
              className="ml-auto bg-[#176219] "
              onPress={() => router.navigate("/home/meal/create-ingredient")}
            >
              <Text className="text-[#E0FBE2]">Edit Ingredient</Text>
            </Button>
          </View>
          <View
            className="p-4 mt-4"
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#176219",
              height: 200,
            }}
          >
            <FlatList
              nestedScrollEnabled
              data={ingredients}
              renderItem={(dish) => (
                <View className="bg-[#E0FBE2] p-2 my-2 rounded-xl flex flex-row items-center justify-between">
                  <View className="flex flex-col ml-2 my-2">
                    <Text className="text-[#176219] text-xl font-semibold">
                      {dish.item.name}
                    </Text>
                    <Text className="text-[#176219] text-lg font-medium">
                      {dish.item.calorie} cal
                    </Text>
                  </View>
                  <Trash size={24} color="red" className="" />
                </View>
              )}
            />
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Rating</Label>
          <View
            style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
          >
            <Picker
              onValueChange={(value) => console.log(value)}
              style={{
                color: "#176219",
                paddingVertical: 0,
              }}
            >
              <Picker.Item
                label="Breakfast"
                value="Breakfast"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="Lunch"
                value="Lunch"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="Dinner"
                value="Dinner"
                style={{ color: "#176219" }}
              />
            </Picker>
          </View>
        </View>
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreateDishForm;
