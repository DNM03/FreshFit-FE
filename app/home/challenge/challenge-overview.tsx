import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

const ChallengeDetail = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full">
        <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">
              Challenge Overview
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1 px-4 mt-4">
          <FormInput placeholder="Eg, Beefsteak" label="Name" />
          <FormInput placeholder="Eg, 200" label="Weight Loss Target" />
          <FormInput placeholder="Eg, 60" label="Fat Percent" />
          <FormInput placeholder="Eg, Beefsteak" label="Target" />
          <FormInput placeholder="Eg, Beefsteak" label="Start Date" />
          <FormInput placeholder="Eg, Beefsteak" label="End Date" />
          <View style={{ marginBottom: 16 }}>
            <Label className="text-[#176219] font-medium">Description</Label>
            <Textarea placeholder="Eg, 1 cup of rice" />
          </View>
          <Button
            className="bg-[#E0FBE2] mt-8"
            onPress={() => router.push("/home/challenge/challenge-detail")}
          >
            <Text className="text-[#176219]">Challenge Detail</Text>
          </Button>
          <Button className="bg-[#176219] mx-20 mb-20 mt-8">
            <Text className="text-[#E0FBE2]">Join</Text>
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChallengeDetail;
