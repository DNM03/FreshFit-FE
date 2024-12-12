import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Picker } from "@react-native-picker/picker";
import { Button } from "~/components/ui/button";

const CreatePlanForm = () => {
  const weeks = [
    {
      name: "Week 1",
      calories: 2000,
    },
    {
      name: "Week 2",
      calories: 2000,
    },
    {
      name: "Week 3",
      calories: 2000,
    },
    {
      name: "Week 4",
      calories: 2000,
    },
  ];
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, Starter plan" label="Name" />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, Beginner friendly" />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Type</Label>
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
                label="Beginner"
                value="Beginner"
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
        </View>
        <FormInput placeholder="Eg, 01/01/2025" label="Start date" />
        <FormInput placeholder="Eg, 8" label="Number of weeks" />
        <View className="flex-1">
          <View className="flex flex-row items-center justify-start">
            <View>
              <Text className="text-[#176219] font-medium">Weeks</Text>
            </View>
            <Button className="ml-auto bg-[#176219] ">
              <Text className="text-[#E0FBE2]">Edit week</Text>
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
              data={weeks}
              renderItem={(week) => (
                <View className="bg-[#E0FBE2] p-2 my-2 rounded-xl flex flex-row items-center justify-between">
                  <View className="flex flex-col ml-2 my-2">
                    <Text className="text-[#176219] text-xl font-semibold">
                      {week.item.name}
                    </Text>
                    <Text className="text-[#176219] text-lg font-medium">
                      {week.item.calories} cal
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreatePlanForm;
