import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

const CreateSetForm = () => {
  const exercises: any[] = [];
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, Starter plan" label="Name" />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, Beginner friendly" />
        </View>
        <FormInput placeholder="Eg, 1" label="Day" />
        <View className="flex-1">
          <View className="flex flex-row items-center justify-start">
            <View>
              <Text className="text-[#176219] font-medium">Exercises</Text>
            </View>
            <Button className="ml-auto bg-[#176219] ">
              <Text className="text-[#E0FBE2]">Edit exercise</Text>
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
              data={exercises}
              renderItem={(exercise: any) => (
                <View className="bg-[#E0FBE2] p-2 my-2 rounded-xl flex flex-row items-center justify-between">
                  <View className="flex flex-col ml-2 my-2">
                    <Text className="text-[#176219] text-xl font-semibold">
                      {exercise.name}
                    </Text>
                    <Text className="text-[#176219] text-lg font-medium">
                      {exercise.calories} cal
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateSetForm;
