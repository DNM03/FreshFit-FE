import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";

const EditUserForm = () => {
  return (
    // <View className="flex-1 px-8 mt-4">
    //   <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
    //     <View className="flex items-center justify-center">
    //       <Image
    //         source={require("~/assets/images/avatar_placeholder.png")}
    //         className="w-32 h-32 rounded-full"
    //       />
    //     </View>
    //     <FormInput placeholder="Eg, John Doe" label="Name" />
    //     <FormInput placeholder="Eg, 20/11/2002" label="Date of birth" />
    //     <FormInput placeholder="Eg, 6'2" label="Height" />
    //     <FormInput placeholder="Eg, 80" label="Weight" />
    //     <FormInput placeholder="Eg, Male" label="Gender" />
    //     <FormInput placeholder="Eg, jonh@doe@mail.com" label="Email" />
    //     <Button className="mt-4 bg-[#176219] ">
    //       <Text className="text-[#E0FBE2]">Save</Text>
    //     </Button>
    //   </ScrollView>
    // </View>

    <View className="flex-1 px-8 mt-4">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <View className="flex items-center justify-center">
          <Image
            source={require("~/assets/images/avatar_placeholder.png")}
            className="w-32 h-32 rounded-full"
          />
        </View>
        <FormInput placeholder="Eg, John Doe" label="Name" value="John" />
        <FormInput
          placeholder="Eg, 20/11/2002"
          label="Date of birth"
          value="20/10/2003"
        />
        <FormInput placeholder="Eg, 6'2" label="Height" value="170" />
        <FormInput placeholder="Eg, 80" label="Weight" value="80" />
        <FormInput placeholder="Eg, Male" label="Gender" value="Male" />
        <FormInput
          placeholder="Eg, jonh@doe@mail.com"
          label="Email"
          value="jonh@doe@mail.com"
        />
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default EditUserForm;
