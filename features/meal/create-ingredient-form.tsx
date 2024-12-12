import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

const CreateIngredientForm = () => {
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, Tomato" label="Name" />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, Good for health" />
        </View>
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
        <FormInput placeholder="Eg, 200" label="Calories (cal)" />
        <FormInput placeholder="Eg, 60" label="Carbohydrate " />
        <FormInput placeholder="Eg, 60" label="Sodium " />
        <FormInput placeholder="Eg, 60" label="Sugar " />
        <FormInput placeholder="Eg, 60" label="Cholesterol " />
        <FormInput placeholder="Eg, 60" label="Fat " />

        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreateIngredientForm;
