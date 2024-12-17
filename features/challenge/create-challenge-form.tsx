import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const CreateChallengeForm = () => {
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, 30 days challenge" label="Name" />
        <View>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea placeholder="Eg, Beginner friendly" />
        </View>
        <FormInput placeholder="Eg, Beginner" label="Type" />
        <FormInput placeholder="Eg, 01/01/2025" label="Start date" />
        <FormInput placeholder="Eg, 01/02/2025" label="End date" />
        <FormInput placeholder="Eg, Lose weight" label="Target" />
        <FormInput placeholder="Eg, 60" label="Weight loss target" />
        <FormInput placeholder="Eg, 10" label="Fat percent" />
        <View>
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
        <FormInput placeholder="Eg, Cup" label="Prize" />
        <View>
          <Label className="text-[#176219] font-medium">Prize Image</Label>
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
      </ScrollView>
    </View>
  );
};

export default CreateChallengeForm;
