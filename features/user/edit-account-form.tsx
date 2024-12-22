import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";

const EditAccountForm = () => {
  return (
    <View className="flex-1 px-8 mt-4">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, ******" label="Old Password" />
        <FormInput placeholder="Eg, ******" label="New Password" />
        <FormInput placeholder="Eg, ******" label="Confirm Password" />
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default EditAccountForm;
