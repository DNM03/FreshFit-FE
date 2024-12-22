import { View, Text } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

const ContactForm = () => {
  return (
    <View className="flex-1 flex flex-col px-8">
      <FormInput placeholder="Eg, Meal recommendation" label="Title" />
      <View style={{ marginBottom: 16, height: 200 }}>
        <Label className="text-[#176219] font-medium">Detail</Label>
        <Textarea
          placeholder="Eg, 1 cup of rice"
          style={{ height: 200 }}
          numberOfLines={10}
        />
      </View>
      <Button className="mt-8 bg-[#176219]">
        <Text className="text-[#E0FBE2]">Send</Text>
      </Button>
    </View>
  );
};

export default ContactForm;
