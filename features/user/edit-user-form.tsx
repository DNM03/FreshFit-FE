import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";

const EditUserForm = () => {
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput placeholder="Eg, John Doe" label="Name" />
        <FormInput placeholder="Eg, 20/11/2002" label="Date of birth" />
        <FormInput placeholder="Eg, 6'2" label="Height" />
        <FormInput placeholder="Eg, 80" label="Weight" />
        <FormInput placeholder="Eg, Male" label="Gender" />
        <FormInput placeholder="Eg, jonh@doe@mail.com" label="Email" />
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default EditUserForm;
