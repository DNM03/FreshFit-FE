import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import CreateChallengeForm from "~/features/challenge/create-challenge-form";

const CreateChallenge = () => {
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
              Create Challenge
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1">
          <CreateChallengeForm />
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateChallenge;
