import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

const CreateIngredientForm = (data?: any) => {
  console.log(data);
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput
          placeholder="Eg, Tomato"
          label="Name"
          value={data.data.name || ""}
          readOnly
        />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea
            placeholder="Eg, Good for health"
            value={data.data.description || ""}
            readOnly
          />
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
          >
            {data.data.image && (
              <Image
                source={{ uri: data.data.image }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>
        <FormInput
          placeholder="Eg, 200"
          label="Calories (cal)"
          readOnly
          value={data.data.calories?.toString()}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Carbohydrate "
          readOnly
          value={data.data.carbohydrate?.toString()}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Sodium "
          readOnly
          value={data.data.sodium?.toString()}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Sugar "
          readOnly
          value={data.data.sugar?.toString()}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Cholesterol "
          readOnly
          value={data.data.cholesterol?.toString()}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Fat "
          readOnly
          value={data.data.fat?.toString()}
        />

        {/* <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button> */}
      </ScrollView>
    </View>
  );
};

export default CreateIngredientForm;
