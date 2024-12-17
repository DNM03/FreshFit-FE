import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const CreateExerciseForm = () => {
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, Pushups" label="Name" />
        <View>
          <Label className="text-[#176219] font-medium">Image or Video</Label>
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
        <FormInput placeholder="Eg, strength" label="Category" />
        <View>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, Beginner friendly" />
        </View>
        <FormInput
          placeholder="Eg, 200"
          label="Estimated calories burned (cal)"
        />
        <FormInput placeholder="Eg, 5" label="Number or reps (reps)" />
        <FormInput placeholder="Eg, 60" label="Duration (minutes)" />
        <FormInput placeholder="Eg, 60" label="Rest time (seconds)" />
      </ScrollView>
    </View>
  );
};

export default CreateExerciseForm;
